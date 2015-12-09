var http = require('http');
var exec = require('child_process').exec;

var products = require('../ontarget/2015-12-08.json');

function getURL(upc){
  return "http://camelcamelcamel.com/search?sq="+upc;
}

function parseProduct(data){
  var index = data.indexOf('class="green">');
  var match = /\$(\d+\.\d+)/.exec(data.slice(index, index+100));
  if(match){
    return {
      price: match[0]
    };
  }
}

function fetchProducts(products, onProduct){
  if(products.length){
    var p = products.shift();
    fetchProduct(p.upc, function(product){
      onProduct(p, product);
      fetchProducts(products, onProduct);
    })
  }
}

function fetchProduct(upc, onProduct){
  exec("curl -L '"+getURL(upc)+"'", function(error, sout, err){
    onProduct(parseProduct(sout));
  });
}

fetchProducts(products, function(p, product){
  console.log({
    title: p.title,
    upc: p.upc,
    price_target: +p.price.slice(1),
    price_amazon: product && +product.price.slice(1)
  });
});
