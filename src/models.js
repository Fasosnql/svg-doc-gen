const styleLangs = {
	css: 'css',
	less: 'less',
	scss: 'scss'
};

const styleLangsVars = {
	[styleLangs.less]: (variable) => `@${variable}`,
	[styleLangs.scss]: (variable) => `$${variable}`,
	[styleLangs.css]: (variable) => `--${variable}`
};

const regexes = {
	svgDocElement: /(<!--\s*?@SVGDoc.*?<\/svg>)/gs,
	nameField: /^.*?name:.*?(.+)$/gm,
	variableField: /^.*?variable:.*?(.+)$/gm,
	svgCode: /(<svg.*?id=["|'](.*)["|']>.*<\/svg>)/gs
};

module.exports = { styleLangs, styleLangsVars, regexes };
