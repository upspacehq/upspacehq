// Admin UI is optional and requires the `vercel-cms` package.
// To enable the admin interface install and configure the package,
// or replace this placeholder with your chosen admin UI.

export default function AdminPage() {
  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Admin (not installed)</h1>
      <p>
        The Vercel CMS integration isn't installed in this environment. If
        you'd like to enable the admin interface, install a compatible
        package (or stub) and re-enable the import in <code>pages/admin.js</code>.
      </p>
      <p>
        Suggested command to install the official package (if available):
      </p>
      <pre style={{ background: '#f6f8fa', padding: '0.5rem' }}>npm i vercel-cms</pre>
    </div>
  );
}