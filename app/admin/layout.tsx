import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", paddingTop: "72px" }}>
      {/* Admin Sidebar */}
      <aside style={{ width: "260px", background: "var(--bg-secondary)", borderRight: "1px solid var(--glass-border)", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--gold)", marginBottom: "1rem" }}>
          Admin Panel
        </h2>
        
        <Link href="/admin/dashboard" className="admin-nav-link" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.9rem", padding: "0.6rem 1rem", borderRadius: "8px", transition: "all 0.2s" }}>
          Dashboard
        </Link>
        <Link href="/admin/products" className="admin-nav-link" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.9rem", padding: "0.6rem 1rem", borderRadius: "8px", transition: "all 0.2s" }}>
          Products Base Price
        </Link>
        <Link href="/admin/orders" className="admin-nav-link" style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.9rem", padding: "0.6rem 1rem", borderRadius: "8px", transition: "all 0.2s" }}>
          Orders Management
        </Link>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: "3rem", background: "var(--bg-void)", overflowY: "auto" }}>
        {children}
      </main>

      <style>{`
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary) !important;
        }
      `}</style>
    </div>
  );
}
