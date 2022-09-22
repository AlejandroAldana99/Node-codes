const fs            = require("fs");
const path          = require("path");
const Dotenv        = require('dotenv-webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => {
	const buildMode = argv.mode === "development"
		? "development"
		: "production";

	const srcFolders = fs.readdirSync(path.resolve(__dirname, "src"), { withFileTypes : true })
		.filter(dirEnt => dirEnt.isDirectory())
		.map(dirEnt => dirEnt.name);
	
	return {
		mode         : buildMode,
		target       : "node",
		watchOptions : {
            ignored : /[/\/](node_modules)[/\/]/,
        },
		entry : {
			server : `${__dirname}/src/index.js`,
		},
		output : {
			path     : `${__dirname}/dist`,
			filename : "[name].js",
		},
		resolve : {
			extensions : [".js", ".json"],

			alias : srcFolders.reduce((acc, folderName) => ({
				...acc,
				[`~/${folderName}`] : path.resolve(__dirname, `src/${folderName}`),
			}), {}),
		},
		externals : [nodeExternals()],
		plugins   : [
			new Dotenv()
		],
	};
};
