# Portfolio Direction: Dual Runtime / Continuous Surface

## Objective

Build a one-page personal site for Maciej Szamowski as a fullstack developer working with Swift, React, Next.js and TypeScript. The page should feel personal, technically credible and visually distinctive without importing the previous marketing narrative.

## Recommended positioning

**Primary message:** Software that feels native, wherever it runs.

**Supporting message:** Fullstack developer building with Swift, React, Next.js and TypeScript.

**Voice:** direct, precise, calm and technically literate. Confident without hype. Short sentences. Specific proof instead of generic claims.

## Information architecture

1. Hero with the primary message, selected-work CTA and one responsive shader.
2. Selected work: hora, Prismatic, Copa City website and GNOME Tray Toggle.
3. About: one craft across native and web, with a compact stack view.
4. Contact: visible email, copy action, GitHub and LinkedIn.

## Project truth set

### hora

- Role: Founder & developer.
- Copy: A native Google Calendar client for Mac.
- Evidence: Swift 6, SwiftUI, AppKit, direct Google Calendar REST API, OAuth 2.0 + PKCE, SwiftData and real-time APN sync.
- Links: [horacal.app](https://horacal.app), [Mac App Store](https://apps.apple.com/app/apple-store/id6761409895), [public website repository](https://github.com/szamowski-dev/hora-web).

### Prismatic

- Role: Creator & maintainer.
- Copy: A tiny native menu-bar app for SteelSeries Arena 7, powered by a reverse-engineered USB HID protocol.
- Evidence: SwiftUI, IOKit, signed and notarized releases, Homebrew distribution.
- Links: [product site](https://szamski.github.io/Prismatic-for-macOS/), [repository](https://github.com/szamski/Prismatic-for-macOS).

### Copa City

- Role: Web developer.
- Copy: A multilingual Next.js platform powered by Storyblok, with custom WebGL shaders, deferred rendering and mobile-first performance.
- Scope rule: describe the website platform only. Never imply development of the Copa City game.
- Links: [official website](https://www.copacity.club/en), [existing technical case study](https://szamowski.dev/case-studies/copa-city-v2-the-rebuild).

### GNOME Tray Toggle

- Role: Creator & maintainer.
- Copy: A lightweight GNOME Shell extension that hides and restores application tray icons with smooth Clutter animations.
- Evidence: JavaScript/GJS, GNOME Shell API, Clutter and official GNOME Extensions publication.
- Links: [GNOME Extensions](https://extensions.gnome.org/extension/9258/tray-toggle/), [repository](https://github.com/szamski/gnome-tray-toggle).

## Visual direction

The page uses a deep-navy editorial system, oversized sans typography and readable mono metadata. The hero uses the cyan-and-violet Ascii Wave preset as its single expressive material, with a protected reading zone on the left and a fade into the page at the bottom. Later sections stay quiet and do not continue the shader as a decorative trace.

Projects use real product and case-study media. Hora is the largest. Prismatic retains its narrow menu-bar shape. Copa City is cinematic but clearly framed as website work. GNOME uses a lean top-panel strip. There is no repeated card grid.

## Technical direction

- Next.js App Router with Server Components for page content.
- shadcn primitives for buttons, mobile Sheet, Separator, Tooltip and copy feedback.
- The `shaders` WebGPU runtime for the Ascii Wave hero, loaded through a tiny client-side gate.
- CSS fallback always rendered below the canvas.
- Reduced motion prevents the shader chunk from loading.
- Real source assets with `next/image` or a media component, stable dimensions and below-fold lazy loading.

## Concept files

- [01 Hero](./concepts/01-hero-dual-runtime.png)
- [02 Selected work: native](./concepts/02-selected-work-native.png)
- [03 Selected work: web and open source](./concepts/03-selected-work-web-open-source.png)
- [04 About and contact](./concepts/04-about-contact.png)

## Research references

- [Stefan Vitasovic portfolio case study](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/): WebGL as a cohesive material system with a mobile fallback.
- [Maxime Heckel](https://maximeheckel.com/): shader work used as technical evidence rather than decoration.
- [Cyd Stumpel](https://cydstumpel.nl/): progressive enhancement, accessibility and direct positioning.
- [Emil Kowalski](https://emilkowal.ski/): products as stronger proof than a skill wall.
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading): client-only dynamic shader chunk.
- [W3C prefers-reduced-motion](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion): motion accessibility baseline.

## Review checkpoint

Approved for implementation. The direction, hero material, project hierarchy, portrait and English-language copy were accepted on 17 July 2026.

Approved decisions:

1. Overall dark editorial direction.
2. Hero message and the cyan-to-violet Ascii Wave material, updated on 18 July 2026.
3. Relative project hierarchy, especially hora as the flagship.
4. Use of the current portrait in About.
5. English as the default site language.
