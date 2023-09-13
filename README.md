# 11ty static API demo

This repo exists to illustrate the concepts of using 11ty to generate a static API.

It has one collection of markdown files, living in the `posts/` directory. The `posts.11tydata.js` file in this directory assigns all other files in the directory to 11ty's `posts` collection, by giving them a `tags` value of `posts`.

The `posts.11tydata.js` also specifies that 11ty should output each of these files to their path with a JSON extension, and that the `_includes/post-layout.njk` templating file should be used to generate the output file contents.

Looking into the `_includes/post-layout.njk` file, we see that it only contains `{% dumpPost %}`. This defers to a custom function that we define in our `.eleventy.js` configuration file.

Inside `.eleventy.js`, we define this `dumpPost` shortcode, which takes the data from the current scope and stringifies the relevant parts to JSON. This is what generates the JSON "endpoints" for each input file.

Lastly, 11ty processes the root level `posts.njk` file, which specifies an output URL of `/all-posts.json`. This templating file then works in much the same way as the individual endpoint files, but it instead uses 11ty's `collections.posts` helper to list everything tagged as the `posts` collection.

Running `npx @11ty/eleventy` in this directory, the following files will be generated:
```
_site/
  all-posts.json
  posts/
    /posts/hello-world.json
    /posts/porta-fringilla.json
```

Thus completing our simple MVP of a statically generated API, with a listing page.
