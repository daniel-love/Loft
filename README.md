# Loft

A simple HTML/CSS boilerplate with a hint of JavaScript.

## What's Loft?

We're not jumping on the bandwagon and trying to make the next Bootstrap, because we don't want that. What we're doing is making something to make our lives easier. We're fed up of rewriting the same styles and the same JavaScript for projects.

So we made Loft - Loft is a simple collection of CSS and JS files to start off your project. Loft contains:

- A CSS Reset (by Eric Meyer)[https://meyerweb.com/eric/tools/css/reset/index.html].
- Pre styles HTML elements, such as Headings, Hyperlinks, Preformatted content and tables.
- A simple HTML/CSS grid.
- A JS Lightbox.
- A JS Carousel.
- Placeholder content.

You'll notice our stylesheet is mostly built up of basic styles, we've not added any pretty styles or anything like that (apart from a few elements), so all you have to do is place the files in your project, add your own styles to `loft.css` you're done!

## Suggestions

If you have any suggestions please email them to mail[dot]danlove[at]gmail[dot]me or me[at]derek-martinez[dot]us

## Contributors

Designer: Daniel Love ([@daniel_love](http://twitter.com/daniel_love))  
Developer: Derek Martinez ([@derekmartinezx](http://twitter.com/derekmartinezx))

## Getting Started (w/o Bower)

Add the style sheet to the `<head>`head section:
```HTML
<link rel="stylesheet" href="./dist/css/loft.css" type="text/css" />
```
Then add your JavaScript (preferably at the bottom):
```HTML
<script type="text/javascript" src="./dist/js/jquery.min.js"></script>
<script type="text/javascript" src="./dist/js/loft.min.js"></script>
```
Then open up `loft.css` and add your styles.

## Getting Started (w/ Bower)

Install using Bower:
```
bower install Loft
```
or add to your bower.json:
```JSON
{
  ...
  "dependencies": {
    ...
    "Loft": "master"
  }
}
```
Include CSS in your HTML:
```HTML
<link rel="stylesheet" href="bower_components/Loft/dist/css/style.css" type="text/css" />
```
Include JavaScript in your HTML:
```HTML
<script type="text/javascript" src="bower_components/Loft/dist/js/loft.min.js"></script>
```
