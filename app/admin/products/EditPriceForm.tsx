"use client";

import { useState, useTransition } from "react";
import { updateBasePrice } from "./actions";

interface EditPriceFormProps {
  productId: string;
  currentPrice: number;
}

export function EditPriceForm({ productId, currentPrice }: EditPriceFormProps) {
  const [price, setPrice] = useState(currentPrice);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await updateBasePrice(productId, price);
    });
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Rp</span>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
          color: "var(--gold)",
          padding: "0.4rem 0.5rem",
          borderRadius: "6px",
          width: "120px",
          outline: "none",
          fontFamily: "monospace"
        }}
        disabled={isPending}
      />
      {price !== currentPrice && (
        <button
          onClick={handleSave}
          disabled={isPending}
          style={{
            background: "var(--gold)",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            padding: "0.4rem 0.8rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: isPending ? 0.5 : 1
          }}
        >
          {isPending ? "Sav..." : "Save"}
        </button>
      )}
    </div>
  );
}
