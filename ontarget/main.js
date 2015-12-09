var http = require('http');

function getURL(page){
  return "http://tws.target.com/searchservice/item/search_results/v2/by_keyword?navigation=true&category=22510&view_type=medium&sort_by=bestselling&facets=&offset=0&pageCount=120&page="+
    page+
    "&response_group=Items%2CVariationSummary&zone=PLP&isLeaf=false&custom_price=false&min_price=from&max_price=to";
}

function parseProducts(data, onProduct){
  data.searchResponse.items.Item.forEach(function(item){
    onProduct({title:item.title, upc:item.upc, asin:item.itemAttributes.asin});
  });
}

function fetchProducts(onProduct, page){
  page = page || 1;

  http.get(getURL(page), function(res){
    var allData = "";
    res.on('data', function(chunk){
      allData += chunk;
    });
    res.on('end', function(){
      parseProducts(JSON.parse(allData), onProduct);

      fetchProducts
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}



function debugProduct(product){
  console.log(product);
}

fetchProducts(debugProduct);
