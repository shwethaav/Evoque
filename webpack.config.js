
const TerserPlugin = require('@rollup/plugin-terser');
const path = require('path');
module.exports = {
  // Other Webpack configurations...
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};
