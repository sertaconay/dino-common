import { Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import 'dotenv/config';

const { ModuleFederationPlugin } = require('webpack').container;

const commonConfig: WebpackConfiguration = {
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'stylelint-custom-processor-loader' },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.(sv|jp|pn)g$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    (process.env.EDITING_MODE === 'off' ? new ModuleFederationPlugin({
      name: process.env.PROJECT_NAME,
      library: { type: 'var', name: process.env.PROJECT_NAME },
      filename: 'common.js',
      exposes: {
        './Button': './src/components/Button',
        './Text': './src/components/Text',
        './Headline': './src/components/Text',
        './Paragraph': './src/components/Text',
        './Input': './src/components/Input',
        './HighlightsInput': './src/components/Input/Highlights',
        './Icon': './src/components/Icon',
        './HighlightsSelect': './src/components/Select/Highlights',
      },
      shared: ['react', 'react-dom'],
    }) : () => ({})),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin({
      dry: true,
    }),
    new HtmlWebpackPlugin({
      title: process.env.PROJECT_NAME,
      template: 'src/templates/index.html',
    }),
  ],
};

export default commonConfig;
