module.exports = {
	type: 'object',
	properties: {
		svgDefsPath: {
			type: 'string'
		},
		stylesConfig: {
			type: 'object',
			properties: {
				outputPath: {
					type: 'string'
				},
				styleLang: {
					type: 'string'
				},
				svgPathInFile: {
					type: 'string'
				}
			}
		},
		htmlConfig: {
			type: 'object',
			properties: {
				outputPath: {
					type: 'string'
				}
			}
		}
	}
};
