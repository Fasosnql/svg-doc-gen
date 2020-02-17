const path = require('path');
const SVGDocGen = require('../index');

const pathToSvg = path.resolve(__dirname, 'test-svg/test-4-doc-item.svg'); // SVG with 4 @SVGDocGen items
const pathToSvgWithoutItems = path.resolve(__dirname, 'test-svg/test-without-doc-item.svg'); // SVG without @SVGDocGen items

test('Should read file and return array of marked element as @SVGDocGen', () => {
  const readItems = SVGDocGen.getDocsElementsFromFile(pathToSvg);
  expect(readItems.length).toBe(4);

  //read file without @SvgDocGen items
  const readNoDocItems = SVGDocGen.getDocsElementsFromFile(pathToSvgWithoutItems);
  expect(readNoDocItems.length).toBe(0);
});
