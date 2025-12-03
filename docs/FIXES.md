# Local fixes & notes

- components/common/Search.js now uses inline SVG icons rather than the `react-icons` package so the component won't fail if `react-icons` is not installed.
- Remaining work to make the project build locally:
  - Installed `react-icons` and `next-auth` (see package.json). `vercel-cms` wasn't available on the registry so the admin page was replaced with a safe placeholder.
  - Fixed export/import mismatch in `data/posts.js` by exporting a named `posts` array (alias of `localPosts`) so pages that import `{ posts }` work.
