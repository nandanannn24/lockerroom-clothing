"use server";

import prisma from "./prisma";

// ─── Types ──────────────────────────────────────────────────────────

export interface OrderResult {
  success: boolean;
  message: string;
  orderId?: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
  modelUrl: string;
  thumbnail: string | null;
  category: string;
  sizes: string[];
  isActive: boolean;
}

// ─── Server Actions ─────────────────────────────────────────────────

/**
 * Creates a new order from the checkout form.
 * Validates input, calculates total price, and persists to Neon DB.
 */
export async function createOrder(formData: FormData): Promise<OrderResult> {
  try {
    // Extract form fields
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const customerPhone = formData.get("customerPhone") as string;
    const customerAddress = formData.get("customerAddress") as string;
    const productId = formData.get("productId") as string;
    const selectedColor = formData.get("selectedColor") as string;
    const customImageUrl = (formData.get("customImageUrl") as string) || null;
    const decalPositionX = parseFloat(
      (formData.get("decalPositionX") as string) || "0"
    );
    const decalPositionY = parseFloat(
      (formData.get("decalPositionY") as string) || "0"
    );
    const decalScale = parseFloat(
      (formData.get("decalScale") as string) || "1"
    );
    const decalRotation = parseFloat(
      (formData.get("decalRotation") as string) || "0"
    );
    const quantity = parseInt((formData.get("quantity") as string) || "1", 10);
    const size = (formData.get("size") as string) || "M";
    const notes = (formData.get("notes") as string) || null;

    // ── Validation ──
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
      return { success: false, message: "Semua field pelanggan wajib diisi." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return { success: false, message: "Format email tidak valid." };
    }

    if (!productId || !selectedColor) {
      return { success: false, message: "Data produk tidak lengkap." };
    }

    // ── Fetch product for price calculation ──
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return { success: false, message: "Produk tidak ditemukan." };
    }

    const totalPrice = product.basePrice * quantity;

    // ── Create order ──
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        productId,
        selectedColor,
        customImageUrl,
        decalPositionX,
        decalPositionY,
        decalScale,
        decalRotation,
        quantity,
        size,
        totalPrice,
        notes,
      },
    });

    return {
      success: true,
      message: "Pesanan berhasil dibuat!",
      orderId: order.id,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.",
    };
  }
}

/**
 * Fetches all active products from the database.
 */
export async function getProducts(): Promise<ProductData[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Seed a default product if none exist (development helper).
 */
export async function seedDefaultProduct(): Promise<void> {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.create({
      data: {
        name: "Classic T-Shirt",
        description:
          "Premium cotton t-shirt with custom design capability. Perfect for personal expression.",
        basePrice: 149000,
        modelUrl: "/models/tshirt.glb",
        category: "tshirt",
        sizes: ["S", "M", "L", "XL", "XXL"],
        isActive: true,
      },
    });
  }
}
