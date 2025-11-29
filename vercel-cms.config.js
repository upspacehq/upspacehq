export default {
  collections: [
    {
      name: "posts",
      label: "Posts",
      folder: "content/posts",   // where CMS will store markdown/json files
      slug: "{{slug}}",
      fields: [
        { name: "title", label: "Title", widget: "string" },
        { name: "excerpt", label: "Excerpt", widget: "text" },
        { name: "content", label: "Content", widget: "markdown" },
        { name: "category", label: "Category", widget: "string" },
        { name: "author", label: "Author", widget: "string" },
        { name: "coverImage", label: "Cover Image", widget: "image" },
        { name: "date", label: "Date", widget: "datetime" },
        { name: "readTime", label: "Read Time", widget: "number" },
        { name: "tags", label: "Tags", widget: "list" }
      ]
    }
  ]
};