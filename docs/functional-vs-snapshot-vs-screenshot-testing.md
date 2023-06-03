# Functional testing vs. snapshot testing vs. screenshot testing

## Functional Tests

Functional tests assert the correct behavior of components by interacting with
them as a user would. This is what we have been talking about in this document.

## Snapshot Tests

Snapshot tests take snapshots of serializable data, usually HTML markup, and
compare it with previous snapshots to make sure that the output hasn't changed.
In case the change is intentional, the previous snapshot must be replaced with
the new one.

Unfortunately, developers tend to be undisciplined about reviewing larger
snapshots, resulting in buggy code being committed. Hence snapshot testing is
not recommended. You could use it for very small components where the snapshot
can be easily read by human beings and verified for correctness (usually 20-30
lines max). Here's an
[example](https://github.com/nareshbhatia/react-testing-techniques/blob/main/src/components/AddressView/__snapshots__/AddressView.test.tsx.snap).

Also note that good tests encode the developer's intention. Snapshot tests lack
the expression of this intent. So for anything beyond the simplest of
components, prefer functional tests.

If you decide to write a snapshot test, use React Testing Library because it
generates cleaner snapshots. The other popular way is to use
react-test-renderer, but its output contains component properties and other
details that are not relevant. Here's an
[example of a snapshot test](https://github.com/nareshbhatia/react-testing-techniques/blob/main/src/components/AddressView/AddressView.test.tsx)
using React Testing Library.

## Screenshot Tests

Screenshot tests (a.k.a. visual tests) are similar to snapshot tests except that
they take screenshots of components (i.e. images as output) and compare them
with previous screenshots. Screenshot tests pinpoint visual changes in
components. Again, large screenshots are of limited value because they may not
be able to isolate issues down to the component level. Also, remember that
screenshot tests are not a replacement for functional tests.
