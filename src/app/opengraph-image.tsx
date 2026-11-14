import { ImageResponse } from "next/og";

export const alt = "CC Bay Life — Corpus Christi and the Coastal Bend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f1e6",
          color: "#1a2c34",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#0c5c78",
          }}
        >
          Corpus Christi · Texas
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 80, lineHeight: 1, fontWeight: 600 }}>
            CC Bay Life
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#3e5560", maxWidth: 820 }}>
            A local guide to the bay, the beaches, and the towns around them.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
