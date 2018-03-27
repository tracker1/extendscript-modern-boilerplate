import path from "path";
import fs from "fs";
import WrapperPlugin from "wrapper-webpack-plugin";
import ReplacePlugin from "webpack-plugin-replace";

var entry = fs
  .readdirSync("./src")
  .filter(f => /\.jsx?$/.test(f))
  .filter(f => !/\.(test|spec)\.jsx?$/.test(f))
  .map(f => [f.replace(/\.jsx?$/, ""), `./src/${f}`])
  .reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {});

entry.shims = fs
  .readdirSync("./extendscript-library/shims")
  .filter(f => /\.jsx?$/.test(f))
  .map(f => `./extendscript-library/shims/${f}`);

module.exports = {
  entry,
  devtool: false,
  output: {
    library: "[name]",
    libraryTarget: "this"
  },
  resolve: {
    modules: [path.resolve(__dirname, "extendscript-library/passthrough"), path.resolve(__dirname, "extendscript-library"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /[\/\\]extendscript-library[\/\\]shims[\/\\].+(\.jsx?)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "shims/[name].[ext]" }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /[\/\\]extendscript-library[\/\\]shims[\/\\].+(\.jsx?)$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              // Needed to handle "default" etc is a reserved word
              "babel-plugin-transform-es3-modules-literals",

              // trailing function commas
              "babel-plugin-syntax-trailing-function-commas",

              /**
               * es2015+ transforms from env
               * 
               * Excludes the following problematic functionality
               *    Anything with classes
               *    getters/setters
               *    generators/async
               * 
               * Excludes module transforms (handled by webpack)
               */
              "@babel/plugin-syntax-object-rest-spread",
              "@babel/plugin-syntax-optional-catch-binding",
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-block-scoped-functions",
              "@babel/plugin-transform-block-scoping",
              "@babel/plugin-transform-classes",
              "@babel/plugin-transform-computed-properties",
              "@babel/plugin-transform-destructuring",
              "@babel/plugin-transform-dotall-regex",
              "@babel/plugin-transform-duplicate-keys",
              "@babel/plugin-transform-for-of",
              "@babel/plugin-transform-function-name",
              "@babel/plugin-transform-literals",
              "@babel/plugin-transform-object-super",
              "@babel/plugin-transform-parameters",
              "@babel/plugin-transform-shorthand-properties",
              "@babel/plugin-transform-spread",
              "@babel/plugin-transform-sticky-regex",
              "@babel/plugin-transform-template-literals",
              "@babel/plugin-transform-typeof-symbol",
              "@babel/plugin-transform-unicode-regex",
              "@babel/plugin-transform-exponentiation-operator",
              "@babel/plugin-transform-new-target",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-catch-binding",
              "@babel/plugin-proposal-unicode-property-regex"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    /*
    new ReplacePlugin({
      patterns: [
        {
          regex: /\bdefault\:/g,
          value: '"default":'
        }
      ]
    }),
    */

    // strict mode for the whole bundle
    new WrapperPlugin({
      // only wrap entry files
      test: /\.js$/,
      header: fileName =>
        process.env.WEBPACK_WATCH === "1"
          ? `// ${fileName} - ${new Date().toJSON()}
          //@include 'shims/index.js';
        `
          : `// ${fileName} - ${new Date().toJSON()}
          //@include 'shims/index.js';
          var LOCAL_EXECUTION = !(app.scriptArgs && app.scriptArgs.isDefined("data"));
          try {
        `,
      footer: fileName =>
        process.env.WEBPACK_WATCH === "1"
          ? `\nJSON.stringify(this["${fileName.replace(
              /\.jsx?$/,
              ""
            )}"].default(), null, 4)\n`
          : `
            JSON.stringify(this["${fileName.replace(
              /\.jsx?$/,
              ""
            )}"].default(), null, LOCAL_EXECUTION ? 4 : undefined)
          } catch(error) {
            error = Object.assign(error, {
              message: error.message, 
              stack: error.stack || $.stack || 'NO STACK AVAILABLE' 
            });
            JSON.stringify({ error: error }, null, LOCAL_EXECUTION ? 4 : undefined);
          }
        `
    })
  ]
};
