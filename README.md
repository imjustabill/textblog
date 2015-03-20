# textblog

This is my no-backend blog. I got tired of reinstalling Wordpress on new webhosts, and I didn't even want to deal with a static site generator, so this project was born. 

Instead of a backend, I rely on an Apache index page containing a list of text files that contain the blog posts. I'm expecting the lists of posts to be sorted by name, oldest to newest, so I use the timestamp as the first part of the file name. 

The file format is very simple:

```
Title
Timestamp
Post
```

Posts are currently just plain HTML, but Markdown support is planned for the future. The only requirement is jQuery, as this is a jQuery plugin. To run, set the `baseUrl` in `textblog.js`, include `textblog.js` in your html, and invoke the plugin on a div:
```
$('#blogContainer').textBlog();
```
