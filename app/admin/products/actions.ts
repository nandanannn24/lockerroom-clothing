"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBasePrice(productId: string, newPrice: number) {
  if (!productId || newPrice < 0) {
    throw new Error("Invalid input");
  }

  await prisma.product.update({
    where: { id: productId },
    data: { basePrice: newPrice },
  });

  revalidatePath("/admin/products");
}
