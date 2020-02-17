const fs = require('fs');
const validateOptions = require('schema-utils');
const schema = require('./schema');
const { styleLangs, styleLangsVars, regexes } = require('./models');

class SVGDocGen {
  constructor(options) {
    validateOptions(schema, options);
    this.options = options;
    this.htmlConfig = this.options['htmlConfig'];
    this.styleOptions = this.options['stylesConfig'];
  }

  static getDocsElementsFromFile(filePath) {
    const file = fs.readFileSync(filePath, 'utf8');
    const matchedItems = file && file.match(regexes.svgDocElement);
    return matchedItems || [];
  }

  static mapDocsElement(elements = [], styleLang = styleLangs.css) {
    return elements.map(element => {
      const [matchedName] = element.match(regexes.nameField);
      const [matchedVariable] = element.match(regexes.variableField);
      const matchedSVGCodeAndId = regexes.svgCode.exec(element);
      regexes.svgCode.lastIndex = 0;

      return {
        name: matchedName.replace(/^\s+name:\s+/, ''),
        variable: styleLangsVars[styleLang](matchedVariable.replace(/^\s+variable:\s+/, '')),
        svgCode: matchedSVGCodeAndId ? matchedSVGCodeAndId[1]: null,
        svgId: matchedSVGCodeAndId ? matchedSVGCodeAndId[2]: null,
      };
    })
  }

  static writeFile(outputConfig, output) {
    const dirPath = getDirPath(outputConfig.outputPath);

    if (dirPath) {
      fs.promises.mkdir(dirPath, { recursive: true }).then(() => {
        fs.writeFileSync(outputConfig.outputPath, output);
      }).catch(console.error);
    } else {
      fs.writeFileSync(outputConfig.outputPath, output);
    }
  }

  apply(compiler) {
    compiler.hooks.done.tap('SVGDocGen', () => {
      const docs = SVGDocGen.mapDocsElement(
        SVGDocGen.getDocsElementsFromFile(this.options.svgDefsPath),
        this.styleOptions.styleLang
      );

      if (this.htmlConfig.outputPath) {
        const iconHtmlTemplate = getIconHtmlOutputTemplate();
        let iconsHtml = '';

        docs.forEach(doc => {
          iconsHtml += iconHtmlTemplate
            .replace('<% iconPath %>', `${this.htmlConfig.svgPathInFile}#${doc.svgId}`)
            .replace('<% iconName %>', doc.name)
            .replace('<% variableName %>', doc.variable)
        });

        const htmlTemplate = getHtmlOutputTemplate().replace('<% icons %>', iconsHtml);

        SVGDocGen.writeFile(this.htmlConfig, htmlTemplate);
      }

      if (this.styleOptions.outputPath) {
        let variables = '';
        docs.forEach(doc => {
          variables += `${doc.variable}: "${this.styleOptions.svgPathInFile}#${doc.svgId}";\n`;
        });

        if (this.styleOptions.styleLang === styleLangs.css || !this.styleOptions.styleLang) {
          variables = `:root {\n${variables}}`
        }

        SVGDocGen.writeFile(this.styleOptions, variables);
      }
    });
  }
}

function getDirPath(path) {
  return path.replace(/\/?[^\/]+$/, '');
}

function getHtmlOutputTemplate() {
  return fs.readFileSync('./src/templates/demo.html', 'utf8');
}

function getIconHtmlOutputTemplate() {
  return fs.readFileSync('./src/templates/icon.html', 'utf8');
}

module.exports = SVGDocGen;
