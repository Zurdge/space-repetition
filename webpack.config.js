const path = require('path');
const webpack = require('webpack');

var environment = 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: environment,
  output: {
    library: 'SpaceRepetition',
    libraryTarget: 'umd',
    filename: 'index.js',
    auxiliaryComment: 'Test Comment',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@types"      : path.resolve(__dirname, 'app', 'types')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        environment: environment
      }
    })
  ],
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ],
  },
  externals: {
    "jQuery": "$",
    "lodash": "_",
    "axios": "axios",
    "moment": "moment"
  }
};
