/* ImageResponse renders native img elements, not next/image. */
/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/lib/site";

export async function SocialImage() {
  const [portrait, horaIcon, pixelIcon] = await Promise.all([
    readFile(join(process.cwd(), "public/images/avatar.jpg"), "base64"),
    readFile(join(process.cwd(), "public/images/hora-icon.png"), "base64"),
    readFile(join(process.cwd(), "public/images/pixel-helper-icon.png"), "base64"),
  ]);

  return (
    <div
      style={{
        background: "#0B0F24",
        color: "#F3F7F6",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "52px 64px 44px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>
          {siteConfig.name}
        </div>
        <div style={{ color: "#A4AEC4", fontSize: 20 }}>szamowski.dev</div>
      </div>

      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 734 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1.05,
            }}
          >
            <span>Senior marketer</span>
            <span style={{ color: "#16DED7" }}>who codes.</span>
          </div>
          <div style={{ color: "#A4AEC4", fontSize: 28, marginTop: 28 }}>
            Building native Mac apps.
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          alt=""
          width={296}
          height={296}
          style={{ borderRadius: 24 }}
        />
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #2A3659",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 36 }}>
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <img src={`data:image/png;base64,${horaIcon}`} alt="" width={44} height={44} />
            <span style={{ fontSize: 23 }}>hora Calendar</span>
          </div>
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <img src={`data:image/png;base64,${pixelIcon}`} alt="" width={44} height={44} />
            <span style={{ fontSize: 23 }}>Pixel Helper</span>
          </div>
        </div>
        <div style={{ color: "#A4AEC4", fontSize: 18 }}>{siteConfig.location}</div>
      </div>
    </div>
  );
}
