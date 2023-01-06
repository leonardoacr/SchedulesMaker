/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path'); // CommonJS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    day: [
      './src/frontend/js/modalCreate.js',
      './src/frontend/js/modalUpdate.js',
      './src/frontend/js/noteContent.js'
    ],
    theme: [
      './src/frontend/js/backgroundImageIncludes/getData.js',
      './src/frontend/js/backgroundImageIncludes/sendData.js',
      './src/frontend/js/backgroundImageIncludes/randomImageButton.js',
      './src/frontend/js/backgroundImageIncludes/resetImageButton.js',
      './src/frontend/js/backgroundImageIncludes/unsplashImageButton.js',
      './src/frontend/js/backgroundImageIncludes/uploadImageButton.js',
      './src/frontend/js/backgroundImage.js',
      './src/frontend/js/changingTheme.js'
    ],
    main: [
      './src/frontend/js/default.js',
      './src/frontend/js/confirmPassword.js',
      './src/frontend/js/main.js'
    ],
    styles: [
      './src/frontend/style/backgroundImage.css',
      './src/frontend/style/days.css',
      './src/frontend/style/general.css',
      './src/frontend/style/home.css',
      './src/frontend/style/schedules.css'
    ]
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'public')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // use: ['file-loader']
        type: 'asset/resource'
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.ejs$/,
        use: ['ejs-compiled-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/[name].bundle.css'
    })
  ],
  devtool: 'source-map'
};
