import { colors, fonts, shadow } from "../theme";
import type { Product } from "../data";

type Props = {
  product: Product;
  scale?: number;
  rotate?: number;
};

export const ProductCard: React.FC<Props> = ({ product, scale = 1, rotate = 0 }) => {
  return (
    <div
      style={{
        background: colors.white,
        border: `6px solid ${colors.black}`,
        borderRadius: 28,
        boxShadow: shadow(10),
        padding: 22,
        width: 420,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: "center",
        fontFamily: fonts.body,
      }}
    >
      <div
        style={{
          background: colors.orangeLight,
          borderRadius: 18,
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 150,
          marginBottom: 16,
          border: `4px solid ${colors.black}`,
        }}
      >
        {product.emoji}
      </div>
      <div
        style={{
          display: "inline-block",
          background: colors.neon,
          color: colors.black,
          border: `3px solid ${colors.black}`,
          padding: "4px 12px",
          fontWeight: 900,
          fontSize: 16,
          borderRadius: 999,
          marginBottom: 10,
          letterSpacing: 0.5,
        }}
      >
        {product.tag}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: colors.black,
          lineHeight: 1.1,
          marginBottom: 10,
        }}
      >
        {product.name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span style={{ color: colors.orangeDeep, fontWeight: 900, fontSize: 40 }}>
          {product.price}
        </span>
        <span
          style={{
            color: "#888",
            textDecoration: "line-through",
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          {product.original}
        </span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: colors.black }}>
        ⭐ {product.rating} · {product.reviews.toLocaleString()} reviews
      </div>
    </div>
  );
};
