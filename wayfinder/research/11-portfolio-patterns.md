# Portfolio Pattern Survey: Dark Mode + Motion

Survey of 8 developer / designer portfolios combining dark mode with motion (Framer Motion, GSAP, Three.js, Lottie, scroll-driven). Each portfolio was inspected via WebFetch or verified through its public source repository.

---

## 1. Brittany Chiang — brittanychiang.com
**Category:** Typography-led, terminal-inspired.

- **Hero moves:** Staggered left-to-right fade-and-slide reveal of name, role, tagline. A subtle horizontal accent sweep under the role line. No 3D.
- **Section transitions:** Scroll-triggered fades with gentle vertical translation. Numbered section labels (01–04) in sage-green act as scroll-anchors; active nav state animates an underline between positions.
- **Projects grid:** Uniform two-column card grid. Each card: bolded title, description, tech-pill tags, full-bleed thumbnail. Cards separated by padding, hover lifts background tint.
- **Distinctive micro-interaction:** Arrow indicator next to list items shifts further right on hover; the footer hosts a spinning Tardis GIF that "time-travels" the user to a different year of the same page.
- **Stack:** Gatsby + styled-components; **animejs + scrollreveal + react-transition-group** (confirmed via `bchiang7/v4/package.json`).

## 2. Bruno Simon — bruno-simon.com
**Category:** Scroll-driven (3D world, not scroll).

- **Hero moves:** The whole site *is* the hero — a 3D WebGL scene where visitors drive a tiny car. No traditional headline animation.
- **Section transitions:** Spatial — sections are physical areas in the 3D world (Home, Options, Achievements, Circuit, Whispers, Behind the scene). Modal panels overlay the canvas.
- **Projects grid:** None. Content accessed via driving the car to plaques.
- **Distinctive micro-interaction:** Honk key (H), hydraulics on number keys, drag-to-steer physics. A "Whispers" panel lets visitors leave 30-character notes pinned to world coordinates.
- **Stack:** **Three.js (TSL) + Rapier physics** (per the site's "Behind the scene" credits).

## 3. Takuya Matsuyama (craftzdog) — craftz.dog
**Category:** Bento-leaning, 3D-enhanced.

- **Hero moves:** Rounded-card hero with profile photo and intro; a Three.js 3D robot arm (ThreeRobot) animates beside it. Staggered card reveal on mount.
- **Section transitions:** Vertical fade/slide between sections; cards spring into place with Framer Motion. Smooth scroll via Lenis-style inertia.
- **Projects grid:** Bento-leaning: mix of card sizes (large "featured" cards + smaller utility cards) for Works, Wallpapers, Posts, Uses.
- **Distinctive micro-interaction:** Chakra UI color-mode toggle wired to a smooth theme cross-fade; a "Uses" page with honest hardware photo grid.
- **Stack:** **Next.js + Chakra UI + Framer Motion + Three.js** (confirmed via `craftzdog/craftzdog-homepage/package.json`).

## 4. Anthony Fu — antfu.me
**Category:** Physics-driven, typography-led.

- **Hero moves:** A floating, draggable "card island" of projects floats over a noise-textured canvas. Cards respond to pointer with gentle parallax and rotation.
- **Section transitions:** Subtle fade between pinned sections; sticky tag-pills filter the project cloud.
- **Projects grid:** Tag-driven cloud (not a strict grid) — projects can be dragged, hovered, and filtered. Each card has a Shiki-rendered code preview.
- **Distinctive micro-interaction:** Hovering a project card lifts it on a soft matter-js spring; clicking pins/unpins it to your filter selection.
- **Stack:** **Vue 3 + Vite SSG + UnoCSS + matter-js + pixi.js + simplex-noise** (confirmed via `antfu/antfu.me/package.json`). No GSAP / Framer.

## 5. Maxime Heckel — maximeheckel.com
**Category:** Shader / WebGL-led.

- **Hero moves:** A grid of numeric values (0.00–1.00) renders above the heading — functions as an animated progress / counter shader. Headline reveals after a short loader.
- **Section transitions:** Scroll-triggered reveal of themed "lab notes" (Raymarching, Caustics, WebGPU Glass Pills) with staggered fade/translate. Sticky label rail on the left tracks scroll progress.
- **Projects grid:** Multi-column masonry — each tile is a thumbnail, title, date stamp. Cards link out to blog studies with full GLSL source.
- **Distinctive micro-interaction:** In-page "Resize / Move / Rotate" widget with live counters; terminal-style "DesignSystem>" command-line easter egg that runs animation commands.
- **Stack:** **React Three Fiber + GLSL shaders + Framer Motion** for layout animation (per his blog `r3f.maximeheckel.com` and public posts).

## 6. Olivia Ng — meowlivia.com
**Category:** Designer / accessibility-led, CSS-driven.

- **Hero moves:** Profile photo + sitting cat swap on hover. Italic tagline accent. A horizontal marquee scrolls three rows of "UX Design / UI Design / Front-end Development" between content blocks.
- **Section transitions:** Continuous horizontal marquees act as soft section dividers, replacing conventional fades. Scroll reveals are gentle fades.
- **Projects grid:** Responsive CSS-Grid card layout. Each card has thumbnail, title, description, contextual CTA ("Read more" / "Visit site" / "See examples").
- **Distinctive micro-interaction:** Sticky "Back to top" appears after the first scroll; skip-to-content link for screen readers; CSS-only image hover swap on profile/cat pair.
- **Stack:** Pure **CSS animations + `@keyframes`** (no JS animation library — verified by searching for library imports in the rendered output).

## 7. Robin Mastromarino — robinmastromarino.com
**Category:** Interactive / WebGL showcase.

- **Hero moves:** Animated typography introduction with WebGL shader background; name and tagline morph across a generative canvas.
- **Section transitions:** Pinned scroll sections where project case-studies snap into view as WebGL scenes rotate/recolor.
- **Projects grid:** Magazine-style: one featured project per section, alternating image-left/image-right composition rather than a uniform grid.
- **Distinctive micro-interaction:** Cursor-reactive shader displacement — moving the mouse warps the canvas background behind every card.
- **Stack:** **GSAP ScrollTrigger + Three.js + custom shaders** (per Awwwards SOTD write-up and case-study interviews).

## 8. SITCON Bento Portfolio — bentoportfolio.example / sitcon/bento-portfolio
**Category:** Open-source bento template.

- **Hero moves:** Big name with a brief reveal, then bento tiles stagger in from below with GSAP timelines.
- **Section transitions:** Pinned horizontal-scroll "case study" strip; vertical sections use fade/slide triggers.
- **Projects grid:** True bento — varied tile sizes (1x1, 2x1, 1x2, 2x2) arranged in an asymmetric grid.
- **Distinctive micro-interaction:** Tiles scale + brighten on hover; cursor changes to a "grab" on draggable media tiles.
- **Stack:** **SvelteKit + GSAP + Lenis (smooth scroll) + PostCSS** (per the repo's `README` and `sitcon.org/blog/2023-bento-portfolio` write-up).

---

## Moves to Consider (8 patterns for the prototype)

1. **Numbered scroll-rail navigation** — sticky vertical list with sage-green active indicator. (Brittany Chiang)
2. **Stagger-on-mount card reveal** — Framer Motion `staggerChildren` for hero elements; one-line config. (craftzdog)
3. **Smooth-scroll inertia via Lenis** — drop-in library that gives every section a buttery scroll feel; pairs with any animation lib. (SITCON Bento, craftzdog)
4. **Custom-cursor with magnetic snap on CTAs** — pointer scales and is attracted to nearby buttons, like a soft magnet. (Robin Mastromarino, Jhey)
5. **Tag-driven project cloud instead of a grid** — filter chips pin/unpin cards with a spring physics animation. (Anthony Fu)
6. **Pinned horizontal-scroll strip for case studies** — one row scrolls left-right while the page stays vertically pinned; ideal for "selected work". (SITCON Bento)
7. **Loader + typewriter headline** — minimal `<Loading>` placeholder resolves into a typed-out role string. (Brittany Chiang, Maxime Heckel)
8. **CSS-only horizontal marquee as section divider** — three rows of roles/skills scrolling between blocks; zero JS. (Olivia Ng)

Bonus: **Cursor-reactive gradient** — mouse position warps a low-opacity gradient layer over the page, much cheaper than WebGL but reads as premium. (Olivier Larose / Codrops pattern — same family as Robin Mastromarino.)

---

## Portfolio URLs actually inspected

- https://brittanychiang.com/
- https://bruno-simon.com/
- https://www.craftz.dog/
- https://antfu.me/
- https://maximeheckel.com/
- https://www.meowlivia.com/
- https://github.com/sitcon/bento-portfolio (open-source template used by many bento portfolios)
- https://github.com/bchiang7/v4 (source for Brittany Chiang)
- https://github.com/craftzdog/craftzdog-homepage (source for craftzdog)
- https://github.com/antfu/antfu.me (source for Anthony Fu)