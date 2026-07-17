# Szamowski Dev Design System

> Status: approved implementation source of truth.

**Project:** Maciej Szamowski personal portfolio  
**Direction:** Dual Runtime / Continuous Surface  
**Design dials:** variance 8/10, motion 6/10, density 3/10

## Product idea

A precise, editorial one-pager that presents Maciej as a fullstack developer working across native Apple platforms and the web. One continuous material connects both worlds. The visual effect supports the project story and never replaces readable content.

## Core principles

- Lead with products and engineering evidence, not a biography or a skill cloud.
- Use one WebGPU Ascii Wave shader in the hero. Keep later sections visually quiet, with no continuity trace.
- Give each project a composition that matches its scope. Do not reduce all projects to equal cards.
- Keep all copy, navigation, project facts and contact details in semantic HTML.
- Use shadcn as an accessible primitive layer, then style it into this system.
- Do not mention Maciej's previous marketing career.

## Color

| Role | Hex | CSS variable | Usage |
|---|---:|---|---|
| Background | `#0B0F24` | `--background` | Deep navy page and shader base |
| Foreground | `#F3F7F6` | `--foreground` | Primary text |
| Surface | `#11172F` | `--card` | Menus and compact overlays only |
| Muted text | `#A4AEC4` | `--muted-foreground` | Supporting copy and metadata |
| Hairline | `#2A3659` | `--border` | Rules, media frames and controls |
| Primary cyan | `#16DED7` | `--primary`, `--accent-warm` | CTA, focus and interactive accents |
| Shader violet | `#5413ED` | shader-only | Decorative shader depth only |
| Readable violet | `#A995FF` | component-level | Web label and accessible violet text |
| Focus ring | `#16DED7` | `--ring` | Keyboard focus |
| Destructive | `#FF6B6B` | `--destructive` | Error states only |

Cyan and violet may blend inside the shader and the contact underline. Exact violet is decorative only because it is too dark for normal text on the page background.

## Typography

- **Display and headings:** Instrument Sans, variable, 500 to 650.
- **Body and interface:** Instrument Sans, 400 to 550.
- **Metadata and selected technical copy:** IBM Plex Mono, 400 to 500.
- **Hero:** `clamp(3.75rem, 7.5vw, 8.5rem)`, line height `0.92`, tracking `-0.055em`.
- **Section heading:** `clamp(2.75rem, 5vw, 5.5rem)`, line height `0.98`.
- **Body:** `clamp(1rem, 1.2vw, 1.25rem)`, line height `1.6`, max 68 characters.
- **Metadata:** `0.75rem` to `0.875rem`, line height `1.5`, no forced uppercase except section labels.

Do not use tiny mono copy as decoration. All project descriptions must remain comfortably readable at 375px.

## Grid and spacing

- Desktop: 12-column grid, max width `1600px`.
- Gutters: `clamp(1.5rem, 3.2vw, 4rem)`.
- Mobile: one column with 24px gutters.
- Breakpoints: 375, 768, 1024, 1440.
- Spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 128px.
- Major section padding: 96 to 160px desktop, 72 to 96px mobile.
- Hairlines divide sections. Giant rounded wrappers do not.

## Geometry and depth

- Buttons and small controls: 8px radius.
- Project media: 8px radius with a 1px hairline.
- Menus and sheets: 12px radius maximum.
- No card radius for open project layouts because there are no project cards.
- No decorative drop shadows. Media may use one subtle black shadow when needed for separation.

## Components

### Header

- Quiet, sticky header with name, Work, About, Contact and one GitHub action.
- 64 to 72px tall on desktop, 56 to 64px on mobile.
- Hairline bottom border and a dark translucent backdrop only while sticky.
- Mobile navigation uses a shadcn Sheet with a visible title and 44px targets.

### Buttons and links

- Primary: cyan fill, deep navy text, 8px radius, minimum 44px height.
- Secondary: transparent with hairline border or underlined text link.
- Hover and press may invert colors or shift opacity. Never move surrounding layout.
- Use visible `:focus-visible` rings.

### Project sections

- Hora is the flagship and receives the largest media area.
- Prismatic is narrow and product-like, echoing the menu-bar app aspect ratio.
- Copa City is a cinematic web case study. Never imply work on the game itself.
- GNOME Tray Toggle is a lean horizontal system strip, not a full-size product card.
- Every project includes role, one technical description, stack and a real link.

### About and contact

- Use the real portrait source without generative replacement or dramatic retouching.
- Native and Web stacks appear as open rows separated by rules, not badges.
- Contact provides a visible email, copy action, GitHub and LinkedIn.

## Motion and shader

- Use the Shaders preset Ascii Wave with its cyan, violet, ASCII and film-grain composition.
- Preserve a deep navy base while masking the detailed layer away from left-aligned copy and toward the bottom edge.
- The bottom fade keeps `Scroll to explore` readable and lets the hero meet the page background without a seam.
- Reduce the detailed layer on compact screens instead of shrinking the typography.
- Load the WebGPU runtime in a separate dynamic client chunk only after the hero enters the viewport and the browser is idle.
- Static CSS fallback exists underneath at all times.
- For `prefers-reduced-motion`, missing WebGPU, disabled JS or a failed chunk, show only the static fallback.
- Do not continue the shader or add a decorative trace below the hero.

## Accessibility and performance gates

- Normal text contrast at least 4.5:1.
- All interactive targets at least 44 by 44px.
- Sequential headings and a skip link.
- Canvas is decorative, `aria-hidden="true"` and `pointer-events: none`.
- No meaning exists only in color, hover or motion.
- Real `alt` text for product images, empty alt only for decorative visuals.
- No horizontal overflow at 375px or in landscape.
- Reserve image aspect ratios to keep CLS below 0.1.
- Lazy-load below-fold media and stop GIF/video playback out of view.

## Forbidden patterns

- Fake terminal, VS Code imitation, code rain or Matrix green.
- Generic black chrome blob, neon grid or several unrelated shaders.
- Default shadcn gray card wall, bento grid or pill cloud.
- Skill bars, percentages, fake metrics, fake awards or an unverified availability claim.
- Scroll hijacking, long loaders, custom cursors or hover-only navigation.
- Marketing career references.
- Em dashes in public copy.

## Responsive intent

- Desktop preserves the asymmetric 12-column composition.
- Tablet reduces media scale but keeps project hierarchy.
- Mobile places copy before media for each project, except where the product identity is clearer with a small icon first.
- WebGPU is optional. The page must remain complete and visually intentional without it.
- Contact email may wrap deliberately at a safe breakpoint rather than overflow or shrink below 16px.
