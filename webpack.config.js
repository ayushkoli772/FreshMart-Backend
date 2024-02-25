
const path = require('path');
//added 26Jul23
const nodeExternals = require('webpack-node-externals');

var webpack = require('webpack');
//import pathobj from 'path';
//const path=pathobj();
module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  //added 26Jul23
  externals: [nodeExternals()], // Exclude Node.js core modules and native modules
  
  
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
  ,  resolve: {
    modules: ['./node_modules']
  }

  , stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  }


  ,
  module: {
    rules: [
      {
     //    test: /\.node$/,
        
        exclude: /node_modules/,


     test: /\.js$/,
     loader: 'babel-loader',  
    //  use: 'babel-loader',
    
     /*     query: {
          presets: ['es2015']
      } */


      },
    ],
  },

  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3002)
    },
    host: '127.0.0.1'
  }

};

