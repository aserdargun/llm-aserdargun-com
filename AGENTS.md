# LLM working contract

- Build the LLM Runtime & Serving Atlas as a core-learning source-backed field guide that maps LLM runtimes and serving engines across seven architectural layers and adds an interactive learning layer.
- Keep atlas truth in `src/data`; no React, DOM, network calls, or unversioned records there. Validation belongs in `scripts/validate-data.ts`.
- A reader views atlas records and learning material; they never influence dataset decisions. Source citations, freshness metadata, and lifecycle status are observer outputs, never inputs to filtering, ranking, or compare logic.
- Category, solution, concept, flashcard, quiz, and lesson schema versions are explicit. Update affected versions when semantics change.
- Every data revision is evidence-cited, version stamped, and included in the static export. Reject solutions without a primary source or a recorded verification date.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and dataset units.
- Verify `npm run validate` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
