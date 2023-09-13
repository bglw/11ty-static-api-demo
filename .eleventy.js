module.exports = function (eleventyConfig) {
  /**
   * A function that takes in a post object from Eleventy,
   * representing the data for one of the markdown files in the posts folder.
   *
   * Returns the data that you would like to expose through the API,
   * to later be stringified and written to disk as JSON files.
   */
  const postAPIData = (page, data) => {
    return {
      date: page.date,
      url: page.url,
      data: {
        title: data.title,
        labels: data.labels,
      },
    };
  };

  /**
   * Register a filter that takes in our entire posts collection,
   * and formats it into a JSON listing that would be consumed as an API.
   *
   * This is used in the posts.njk top-level file, to generate the /all-posts.json feed
   */
  eleventyConfig.addFilter("indexPosts", (collectionInput) => {
    return JSON.stringify(
      { posts: collectionInput.map((page) => postAPIData(page, page.data)) },
      null,
      2
    );
  });

  /**
   * Register a shortcode that takes in a single post from the current scope,
   * and formats it into a JSON listing that would be consumed as an API.
   *
   * This is used in the _includes/post-layout.njk file,
   * which is the layout set for all markdown files in the posts/ folder,
   * which thus generates the /posts/*.json "endpoints".
   */
  eleventyConfig.addShortcode("dumpPost", function () {
    return JSON.stringify(postAPIData(this.page, this.ctx), null, 2);
  });

  return {};
};
