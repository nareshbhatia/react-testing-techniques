# Snapshot testing vs. traditional unit testing

Use snapshot tests only for small focused components where the snapshots can be
easily read by human beings and verified for correctness (usually 20-30 lines
max). Developers tend to be undisciplined about reviewing larger snapshots,
resulting in buggy code to be committed. Moreover, good tests encode the
developer's intention. Snapshot tests lack the expression of this intent. So for
anything beyond the simplest of components, prefer a traditional unit test.

If you do decide to write a snapshot test, use React Testing Library's APIs
because they generate cleaner snapshots. The other popular way to generate
snapshots is react-test-renderer, but its output contains component properties
and other details that are not relevant. Here's an
[example of a snapshot test](../src/pages/NotFoundPage/NotFoundPage.test.tsx)
using React Testing Library.
