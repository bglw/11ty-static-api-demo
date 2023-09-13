module.exports = {
  layout: "post-layout.njk",
  permalink: "{{ page.filePathStem }}.json",
  // 👇 Sets all items in this directory to be of the "posts" collection
  tags: "posts",
};
