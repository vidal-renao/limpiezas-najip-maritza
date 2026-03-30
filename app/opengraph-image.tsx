import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "D'Namar Reinigungsdienst Basel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a2e4a",
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
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,130,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo circle */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#4caf82",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "white", fontSize: "36px", fontWeight: "bold" }}>N</span>
        </div>

        {/* Brand name */}
        <div style={{ color: "white", fontSize: "56px", fontWeight: "bold", marginBottom: "12px" }}>
          D&apos;Namar
        </div>

        {/* Tagline */}
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "26px", marginBottom: "32px" }}>
          Reinigungsdienst Basel
        </div>

        {/* Divider */}
        <div style={{ width: "60px", height: "3px", background: "#4caf82", marginBottom: "28px" }} />

        {/* Services */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Haushaltsreinigung", "Büroreinigung", "Umzugsreinigung", "Tiefenreinigung"].map((s) => (
            <div
              key={s}
              style={{
                background: "rgba(76,175,130,0.15)",
                border: "1px solid rgba(76,175,130,0.4)",
                borderRadius: "999px",
                padding: "6px 18px",
                color: "#4caf82",
                fontSize: "16px",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px", marginTop: "40px" }}>
          dnamar.ch
        </div>
      </div>
    ),
    { ...size }
  );
}
