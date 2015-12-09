var http = require('http');

function getURL(page){
  var offset = (page - 1) * 120;
  return "http://tws.target.com/searchservice/item/search_results/v2/by_keyword?navigation=true&category=22510&view_type=medium&sort_by=bestselling&facets=&offset="+
    offset+
    "&pageCount=120&page="+
    page+
    "&response_group=Items%2CVariationSummary&zone=PLP&isLeaf=false&custom_price=false&min_price=from&max_price=to";
}

function parseProducts(data, onProduct){
  data.searchResponse.items.Item.forEach(function(item){
    onProduct({title:item.title, upc:item.upc, asin:item.itemAttributes.asin, price: item.priceSummary.offerPrice.amount});
  });
  return data.searchResponse.items.Item.length;
}

function fetchProducts(onProduct, onDone, page){
  page = page || 1;

  http.get(getURL(page), function(res){
    var allData = "";
    res.on('data', function(chunk){
      allData += chunk;
    });
    res.on('end', function(){
      if(parseProducts(JSON.parse(allData), onProduct)){
        fetchProducts(onProduct, onDone, page+1);
      }
      else{
        onDone();
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}


var allProducts = [];

function collectProduct(product){
  allProducts.push(product);
}

function done(){
  console.log(JSON.stringify(allProducts, undefined, 2));
}

fetchProducts(collectProduct, done);
