import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in-up">
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "0.5rem" }}>
        Manajemen <span style={{ color: "var(--gold)" }}>Pesanan</span>
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Daftar pesanan masuk lengkap dengan preview desain custom.
      </p>

      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--glass-border)" }}>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pelanggan</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pesanan</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Warna</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Sablon (Custom)</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Harga</th>
              <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Belum ada pesanan masuk.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--glass-border)", transition: "background 0.2s" }}>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{order.customerName}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{order.customerEmail}</p>
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <p style={{ fontWeight: 500 }}>{order.product.name}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{order.size} (Qty: {order.quantity})</p>
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: order.selectedColor, border: "1px solid var(--glass-border)" }} />
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>{order.selectedColor}</span>
                    </div>
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    {order.customImageUrl ? (
                      <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "8px", overflow: "hidden", background: "rgba(0,0,0,0.5)", border: "1px solid var(--glass-border)" }}>
                        {order.customImageUrl.length > 500 ? (
                          <img src={order.customImageUrl} alt="Custom Design" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        ) : (
                          <Image src={order.customImageUrl} alt="Custom Design" fill style={{ objectFit: "contain" }} />
                        )}
                      </div>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontStyle: "italic" }}>Tidak ada sablon</span>
                    )}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", fontWeight: 600, color: "var(--gold)" }}>
                    Rp {order.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <span style={{ 
                      padding: "0.3rem 0.6rem", 
                      background: order.status === "pending" ? "rgba(245, 197, 24, 0.15)" : "rgba(34, 197, 94, 0.15)",
                      color: order.status === "pending" ? "var(--gold)" : "#4ade80",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "capitalize"
                    }}>
                      {order.status}
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
