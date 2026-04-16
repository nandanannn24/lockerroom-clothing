import prisma from "@/lib/prisma";
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const orderCount = await prisma.order.count();
  const productCount = await prisma.product.count({ where: { isActive: true } });

  // Get total revenue
  const orders = await prisma.order.findMany({ select: { totalPrice: true } });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return (
    <div className="animate-fade-in-up">
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Dashboard <span style={{ color: "var(--gold)" }}>Overview</span>
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>
        Ringkasan data e-commerce LockerRoom hari ini.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        <div className="glass-card" style={{ padding: "2rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            Total Pesanan
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
            {orderCount}
          </p>
        </div>

        <div className="glass-card" style={{ padding: "2rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            Produk Aktif
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
            {productCount}
          </p>
        </div>

        <div className="glass-card" style={{ padding: "2rem" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            Estimasi Pendapatan
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1.2 }}>
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
