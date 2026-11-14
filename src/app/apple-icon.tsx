import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070b12",
          color: "#e8b15a",
          fontSize: 84,
          fontWeight: 650,
        }}
      >
        CC
      </div>
    ),
    { ...size },
  );
}
