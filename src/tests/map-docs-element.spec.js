const path = require('path');
const SVGDocGen = require('../index');

const pathToSvg = path.resolve(__dirname, 'test-svg/test-1-doc-item.svg'); // SVG with 1 @SVGDocGen items

test('Should return empty array for empty array argument', () => {
  const mappedArray = SVGDocGen.mapDocsElement([]);
  expect(mappedArray.length).toBe(0);
});

test('Should return proper mapped element', () => {
  const svgElements = SVGDocGen.getDocsElementsFromFile(pathToSvg);
  const [mappedElement] = SVGDocGen.mapDocsElement(svgElements); // without second argument should as default set lang as css
  const expectedDefaultOutput = {
    name: 'Icon1',
    variable: '--icon1',
    svgCode: `<svg id="icon1.svg">
         <use xlink:href="#def-icon1.svg"/>
    </svg>`,
    svgId: 'icon1.svg'
  };

  expect(mappedElement).toStrictEqual(expectedDefaultOutput);

  const [mappedScssElement] = SVGDocGen.mapDocsElement(svgElements, 'scss'); //output for scss
  const expectedScssOutput = {
    name: 'Icon1',
    variable: '$icon1',
    svgCode: `<svg id="icon1.svg">
         <use xlink:href="#def-icon1.svg"/>
    </svg>`,
    svgId: 'icon1.svg'
  };

  expect(mappedScssElement).toStrictEqual(expectedScssOutput);

  const [mappedLessElement] = SVGDocGen.mapDocsElement(svgElements, 'less'); //output for less
  const expectedLessOutput = {
    name: 'Icon1',
    variable: '@icon1',
    svgCode: `<svg id="icon1.svg">
         <use xlink:href="#def-icon1.svg"/>
    </svg>`,
    svgId: 'icon1.svg'
  };

  expect(mappedLessElement).toStrictEqual(expectedLessOutput);
});
