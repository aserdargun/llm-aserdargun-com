# Layered Atlas fidelity ledger

QA date: 2026-08-12

## Evidence

- Accepted desktop references: `docs/design/layered-atlas-home-reference.png`, `layered-atlas-explore-reference.png`, and `layered-atlas-compare-reference.png`.
- Accepted mobile reference: `docs/design/layered-atlas-mobile-reference.png` (a composite showing the result list and filter drawer).
- Implementation captures: Playwright Chromium at 1536×1024 for desktop and 390×844 for mobile. Captures were inspected with `view_image` in the same QA pass as the accepted references.
- Functional coverage: desktop home → filtered explorer → comparison → locale switch → guide result; mobile drawer open → Escape close → focus restoration → horizontal overflow audit.

## Reference-to-render inspection

| Area | Accepted concept | Render evidence | Resolution |
| --- | --- | --- | --- |
| Global frame | White editorial canvas, thin navy rules, electric-blue actions, centered navigation | Header, active underline, locale control, off-white content surfaces, and dark footer remain consistent across all routes | Matched; implementation uses a slightly warmer content field to improve section separation |
| Hero hierarchy | Oversized two-line Turkish statement, supporting copy, paired CTAs, layered technical diagram | Render preserves the same copy, hierarchy, action order, and seven-plane diagram above the fold | Matched; diagram remains deliberately schematic rather than decorative |
| Seven-layer taxonomy | A single bordered strip with compact mono layer codes and concise role summaries | Desktop renders seven equal cells; mobile converts them to one bordered vertical sequence without changing order or copy | Matched with responsive reflow |
| Explorer density | Persistent filter rail, sortable-looking technical table, mono category codes, compact status labels | Desktop shows the same rail/table composition and eight INF rows at the reference viewport | Matched; implementation uses current seven-layer names and verified 2026 data |
| Mobile explorer | Search and filter entry point, open solution rows, full-height filter drawer, sticky result action | Render replaces the wide table with open semantic cards and displays the drawer above a dimmed page | Initial horizontal table overflow was removed; Escape now closes the dialog and restores focus |
| Compare matrix | Architectural warning followed by a dense role/hardware/deployment matrix | Render keeps the warning, column headers, close controls, and comparison criteria in a bounded table | Matched; actual data is sourced from the validated records instead of concept placeholders |
| Long-page rhythm | Editorial content blocks with strong tonal transitions and a compact footer | Render uses warm taxonomy, dark rationale/scenario, white evidence card, and dark footer bands | Matched; page is intentionally taller because it carries complete production copy |

## Above-the-fold copy diff

The approved Turkish hero headline, supporting sentence, and both CTA labels are unchanged in the implementation. The only visible header addition is the language icon, which clarifies that `TR / EN` is an interactive locale control. The explorer freshness line was updated from concept placeholder content to `DOĞRULANDI · 2026-08-12`.

## Result

No material visual mismatch remains in the inspected home, explorer, comparison, or mobile drawer surfaces. Native-viewport interaction tests pass without horizontal document overflow.
