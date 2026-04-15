import { prisma } from "@/lib/prisma";
import { EditPriceForm } from "./EditPriceForm";
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in-up">
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "0.5rem" }}>
        Daftar <span style={{ color: "var(--gold)" }}>Produk</span>
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Manajemen harga dasar untuk produk pakaian custom.
      </p>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--glass-border)" }}>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Produk</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Kategori</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Harga Dasar (Base Price)</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Tidak ada produk ditemukan. Pastikan database sudah ter-seed.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid var(--glass-border)", transition: "background 0.2s" }}>
                  <td style={{ padding: "1.2rem 1.5rem", fontWeight: 600 }}>{product.name}</td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>{product.category}</td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <EditPriceForm productId={product.id} currentPrice={product.basePrice} />
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <span style={{ 
                      padding: "0.3rem 0.6rem", 
                      background: product.isActive ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: product.isActive ? "#4ade80" : "#f87171",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}>
                      {product.isActive ? "Aktif" : "Non-Aktif"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
