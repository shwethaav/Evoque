const path = require('path');

module.exports = {
  entry: './src/index.js', // Assuming your entry point is in src/index.js
  output: {
    path: path.resolve(__dirname, 'dist'), // Output to /path/to/your/project/dist
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
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
    contentBase: path.resolve(__dirname, 'dist'), // Serve content from /path/to/your/project/dist
    // other devServer configurations
  }
};

