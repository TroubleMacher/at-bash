module.exports = {
	quiet: true,
	envs: [
		'browser'
	],
	globals: [
		'browser',
	],
	rules: {
		"no-unused-expressions": [
			"error",
			{
				"allowTernary": true
			}
		]
	},
	ignores: [
		"**/*.min.js"
	],
	settings: {
			"react": {
				"version": "16.13"
			}
	}
};
