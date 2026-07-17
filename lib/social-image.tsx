import { siteConfig } from "@/lib/site";

export function SocialImage() {
  return (
    <div
      style={{
        alignItems: "stretch",
        background: "#0B0F24",
        color: "#F3F7F6",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "64px 72px 54px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(22,222,215,0.9) 0%, rgba(22,222,215,0.24) 25%, rgba(84,19,237,0.46) 54%, rgba(11,15,36,0) 74%)",
          border: "1px solid rgba(243,247,246,0.13)",
          borderRadius: 999,
          display: "flex",
          height: 540,
          position: "absolute",
          right: -95,
          top: 44,
          transform: "rotate(-18deg)",
          width: 480,
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 19,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#A4AEC4",
            fontFamily: "monospace",
            fontSize: 17,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.location}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          position: "relative",
          width: 900,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.055em",
            lineHeight: 0.98,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            color: "#A4AEC4",
            fontFamily: "monospace",
            fontSize: 21,
            letterSpacing: "0.02em",
          }}
        >
          Swift · React · Next.js · TypeScript
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 12,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#16DED7",
            borderRadius: 999,
            display: "flex",
            height: 5,
            width: "46%",
          }}
        />
        <div
          style={{
            background: "linear-gradient(90deg, #16DED7 0%, #7650FF 100%)",
            borderRadius: 999,
            display: "flex",
            height: 5,
            width: "16%",
          }}
        />
        <div
          style={{
            background: "#5413ED",
            borderRadius: 999,
            display: "flex",
            height: 5,
            width: "38%",
          }}
        />
      </div>
    </div>
  );
}
