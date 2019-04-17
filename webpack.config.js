const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);


module.exports = {
  mode: `development`, // Режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: { // Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  module: { // Расширяем функциональность лоадерами
    rules: [{
      test: /\.js$/, // Проверка типов файлов, над которыми будет работать лоадерами
      use: `babel-loader` // Лоадер, который будет применен
    },       //{
    //   test: /\.css$/,
    //   use: ['style-loader', 'css-loader'],
    // },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })],
  devServer: {
    contentBase: path.join(__dirname, `public`), // Где искать сборку
    publicPath: `http://localhost:8080/`, // Веб адрес сборки
    compress: true,
    watchContentBase: true
  }
};
