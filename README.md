<div align="center">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1>SVG Doc Generator</h1>
</div>

[Package in NPM][npm-url]

# SVG Doc Generator
This plugin generates demo and css/less/scss variables based on doc comment inside you sprites.svg file.

For now it is working only with sprites files, but in future it will be extended to usage it with multiple svg files. You can read more about creating sprites in [this article] (https://css-tricks.com/svg-fragment-identifiers-work/)

## Getting Started
First of all you have to install `svg-doc-gen`
```bash
npm install --save-dev svg-doc-gen
```

Then you have to add this plugin to your `webpack.config.js` file.

```js
const path = require('path');
const SVGDocGen = require('svg-doc-gen');

module.exports = {
  plugins: [
    new SVGDocGen({
      svgDefsPath: path.resolve(__dirname, 'path-to-sprites/sprites.svg'),
      stylesConfig: {
        outputPath: path.resolve(__dirname, 'styles/svg-vars.css'),
      },
      htmlConfig: {
        outputPath: path.resolve(__dirname, 'demo/demo.html')
      }
    })
  ]
};
``` 

To generate particular variables and add icons from svg to `.html` file you have to add comments in `.svg` file as well.\
In example:
```xml
<svg version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 24 24">
    <defs>
        <g id="def-icon1.svg">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </g>
    </defs>
    <!--
        @SVGDoc
        name: Icon1
        variable: icon1
    -->
    <svg id="icon1.svg">
         <use xlink:href="#def-icon1.svg"/>
    </svg>
</svg>

```
This is just simple sprite svg file with one icon, but most important part of it is declaration of `@SVGDocGen` - this comment says that icon below should be added to documentation.

All comments looks like: 

```html
<!--
    @SVGDoc
    name: Icon1 - name of presentation in generated .html file
    variable: icon1 - variable name in style file.
-->
```

From above svg file output will be look like below:

`styles/svg-vars.css`:
```css
:root {
--icon1: "/path-to-sprites/sprites.svg#black/baseline-close-24px.svg";
}
```

And HTML with more icons will be similar to below one:
<div align="center">
  <img width="600" height="230" vspace="" hspace="25" src="https://i.ibb.co/K98HC0R/Screenshot-2020-02-18-at-17-16-26.png">
</div>

## Options
```js
stylesConfig: {
  styleLang: 'css|scss|less',
  svgPathInFile: 'assets/sprites.svg'
},
htmlConfig: {
  svgPathInFile: 'assets/sprites.svg'
}
```
`styleLang` is a property to set syntax of output variable, as default it is CSS.

`svgPathInFile` - it is a path to svg file after compilation of your project. In example if your compiling process copied svg files to another location you could define the proper path which will be added in output variable file. As default it is the same path like `svgDefsPath`. Example of usage could be Angular app when all assets are copied to location which was set in `angular.json`  
## License

[MIT](./LICENSE)

[npm-url]: https://www.npmjs.com/package/svg-doc-gen
