const tsconfig = require('./tsconfig.json');

const tsconfigAliases = Object.entries(tsconfig.compilerOptions.paths).reduce((acc, [k, [v]]) => {
	const key = k.replace(/\/\*$/, '');
	const value = v.replace(/^\./, 'src').replace(/\/\*$/, '');

	acc[key] = value;

	return acc;
}, {});

module.exports = {
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-favicon',
			options: {
				logo: './static/favicon.png',
			},
		},
		'gatsby-plugin-typescript',
		{
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: tsconfigAliases,
      },
    },
	],
};

