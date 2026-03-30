import React from "react";

function BrandLogo({ variant = "light", size = "md" }) {
  const palette =
    variant === "dark"
      ? {
          auto: "#f3f6fb",
          assist: "#c8d5e5",
          underline: "#78a6ff",
        }
      : {
          auto: "#0f1115",
          assist: "#8ca1b5",
          underline: "#2f6fed",
        };

  const dimensions = {
    sm: {
      width: 180,
      fontSize: 30,
      underlineWidth: 150,
      underlineHeight: 16,
    },
    md: {
      width: 220,
      fontSize: 38,
      underlineWidth: 182,
      underlineHeight: 18,
    },
    lg: {
      width: 280,
      fontSize: 48,
      underlineWidth: 220,
      underlineHeight: 22,
    },
  };

  const config = dimensions[size] || dimensions.md;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        lineHeight: 1,
      }}
    >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            fontFamily: '"Trebuchet MS", "Segoe UI", Arial, sans-serif',
            fontSize: `${config.fontSize}px`,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            textTransform: "lowercase",
          }}
        >
          <span style={{ color: palette.auto }}>auto</span>
          <span style={{ color: palette.assist }}>assist</span>
        </div>

      <svg
        width={config.underlineWidth}
        height={config.underlineHeight}
        viewBox="0 0 220 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 16C49 9 89 7 124 7C159 7 188 9 214 16"
          stroke={palette.underline}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default BrandLogo;
