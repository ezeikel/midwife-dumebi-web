import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Blog - Midwife Dumebi"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fbf6ef 0%, #f3e9dd 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #e9b7b0 0%, #c98f88 50%, #8faf9a 100%)",
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          {/* Logo/Brand mark */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e9b7b0 0%, #c98f88 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                color: "#fffdfc",
                fontWeight: "700",
              }}
            >
              MD
            </span>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: "#2a1e1a",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Blog
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#6b5b53",
              marginBottom: "40px",
              lineHeight: 1.4,
            }}
          >
            Expert articles on birth planning, pregnancy support, and NHS maternity care
          </p>

          {/* Feature badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["Birth Planning", "Pregnancy Tips", "NHS Guidance"].map(
              (feature) => (
                <div
                  key={feature}
                  style={{
                    background: "#fffdfc",
                    border: "2px solid #e9b7b0",
                    borderRadius: "24px",
                    padding: "12px 24px",
                    fontSize: "20px",
                    color: "#c98f88",
                    fontWeight: "600",
                  }}
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#6b5b53",
            }}
          >
            www.midwifedumebi.com/blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
