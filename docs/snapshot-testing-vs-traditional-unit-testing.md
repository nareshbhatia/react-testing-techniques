# Snapshot testing vs. traditional unit testing

> Note: This section refers to snapshot tests that take snapshots of markup, not
> images. There are also image snapshot tests that pinpoint visual changes.
> While markup snapshot tests are not encouraged, image snapshot tests are
> encouraged to identify styling regressions.

Use snapshot tests only for small components where the snapshots can be easily
read by human beings and verified for correctness (usually 20-30 lines max).
Here's an
[example](../src/components/AddressView/__snapshots__/AddressView.test.tsx.snap).
Developers tend to be undisciplined about reviewing larger snapshots, resulting
in buggy code to be committed. Moreover, good tests encode the developer's
intention. Snapshot tests lack the expression of this intent. So for anything
beyond the simplest of components, prefer traditional unit tests.

If you decide to write a snapshot test, use React Testing Library because it
generates cleaner snapshots. The other popular way is to use
react-test-renderer, but its output contains component properties and other
details that are not relevant. Here's an
[example of a snapshot test](../src/components/AddressView/AddressView.test.tsx)
using React Testing Library.
