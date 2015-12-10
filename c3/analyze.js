var data = require('./rawfuckedupdata.json');

console.log("price diff / buy price, price diff, upc, title")
data
  .filter(a=>
    (typeof a.price_target === 'number') && (typeof a.price_amazon === 'number')
  )
  .map(a=>(
    (a.diff = a.price_amazon - a.price_target),
    (a.ratio = a.diff/a.price_target),
    a
  ))
  .sort((a, b)=>
    a.ratio - b.ratio
    // a.diff - b.diff
  )
  .forEach(a=>
    console.log(a.ratio+","+a.diff.toPrecision(3)+","+a.upc+","+a.title)
  );
