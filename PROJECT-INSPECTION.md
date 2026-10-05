# Project inspection — 5 October 2026

## Main finding: scroll motion loses its enabling class

The code is imported and built, but the Home loader-ready render removes the class required by the scroll animation CSS.

1. `src/pages/Home/Home.jsx:139` calls `useScrollMotion` on mount.
2. `src/hooks/useScrollMotion.js:132` adds `motion-enabled` to the Home root through `classList.add`.
3. `src/pages/Home/Home.jsx:145` sets `pageReady` after 3100 ms.
4. `src/pages/Home/Home.jsx:179` supplies React with `className="site site--ready"` after that state change. React replaces the class attribute, removing the hook's `motion-enabled` class.
5. The hook effect at `src/hooks/useScrollMotion.js:374` depends on stable refs and the React state setter, so this loader state update does not reinstall the controller.
6. The CSS beginning at `src/App.css:4627` requires `.motion-enabled [data-scroll-reveal]`. Its opacity, translation, scaling and clipping rules no longer match after the loader finishes.

Consequently, increasing travel distances or changing scroll easing can update inline custom properties without producing the intended visual movement. The Hero entrance and other effects that do not require this class can still work.

### Reproduction evidence

A standalone reproduction used the installed `react-dom/client` renderer and `flushSync` with a minimal DOM host. It rendered the same initial class, added the class imperatively as the hook does, and rendered the same loader-ready class update:

```text
After hook adds class: site  motion-enabled
After pageReady className update: site site--ready
motion-enabled preserved: false
```

This verifies React's class replacement behavior. It is not a visual browser recording of the whole application; browser automation was unavailable in this session.

The repair should give the enabling class one owner, or place the imperative motion class on a stable wrapper whose React className does not change. It should include a lifecycle check that completes the loader, then verifies that scroll styles still apply. No application source was changed during this inspection.

## Other findings

| Finding | Evidence | Consequence |
|---|---|---|
| Desktop navigation entrance selector is disconnected | `App.css:2080` uses `.site--ready .desktop-nav a`, but `SiteLayout.jsx` renders Header before the Home `.site` wrapper | The individual navigation reveal rules do not match. The separate header-inner animation can still run. |
| Seven routes are placeholders | About, InteriorServices, InteriorProducts, Projects, Gallery, Blog and Contact each return one text div | The Home motion controller is not installed on those pages. |
| Some written animation values have no consumer | `--why-row-delay` is set in Why JSX/CSS; Services and Products set `--reveal-delay`, but their scroll targets use numeric ranges in `scrollReveal.js` | Changing these delay values does not change those scroll-driven entrances. `--reveal-delay` is used by the separate Project row animations. |
| Services font variable is undefined | Four declarations in App.css use `var(--font-heading)`; index.css defines `--font-display` and `--font-body` | Those font declarations are invalid and fall back through inheritance rather than selecting the intended variable. |
| Two Services entries reuse a photograph | Home uses `serviceMakeover` for both the first and fourth service images | Switching between these entries cannot show a different photograph. |
| Reduced-motion preferences disable effects | `configureReveals` removes `motion-enabled` when reduced motion matches; CSS disables animation and transitions; Hero autoplay also stops | This is an additional intended disable condition. The user's current OS/browser preference was not accessible. |
| Responsive rules reduce effects | Hero scroll parallax is disabled at 960px and below; mobile entrance travel is capped; Products depth is disabled at 760px and below | Desktop and mobile movement are intentionally different. |

The Products number selector was rechecked: `.home-products-number-mask` matches its JSX. The earlier interim mismatch observation was incorrect.

## What is connected correctly

- Entry chain: `index.html → main.jsx → App.jsx → SiteLayout/Home`.
- Home imports App.css, the scroll hook and all three Home components.
- Scroll hook imports `scrollReveal.js`, attaches scroll/resize listeners and writes the custom properties consumed by the motion CSS.
- Component CSS files are imported by their respective components.
- The production build contains the application JS/CSS and referenced photographs.
- Backup `.bak` files are not referenced by the active import graph; their contents do not run.

## Inspection coverage and verification

Inspected active source, component CSS, routes, configuration and all seven test files. The repository file scan read 43 text files and 35 backup files, excluding generated dependencies/build output; binary assets were inventoried rather than treated as text. The lockfile was parsed and contains 110 package entries.

- `node --test tests/*.test.js`: 47 passed, 0 failed.
- `npm.cmd run build`: succeeded, 59 modules transformed.
- `npm.cmd run lint`: completed with two warnings, in Header and Footer.
- React class overwrite reproduction: confirmed that the enabling class is removed.

Existing controller tests use mocked roots and do not exercise Home's React className update when the preloader finishes. Static rendering tests also cannot detect that lifecycle interaction. Passing those tests therefore does not establish that the effects remain visually enabled.

The actual browser page and its current settings could not be inspected because no browser surface was available. The primary finding is supported by the source lifecycle and the React renderer reproduction.
