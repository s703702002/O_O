require('@babel/register')({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: [],
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],
});

require('./server.js');
