const fs = require('fs');

const json = [];

for (let i = 0; i < 1000; i++) {
  const product = {
    id: i,
    title: '商品名稱',
    price: Math.floor(Math.random() * 5000),
    inventory: Math.floor(Math.random() * 100),
    gender: (Math.random() > 0.5) ? 0 : 1,
  };
  json.push(product);
}

fs.writeFile('./api/products.json', JSON.stringify(json), function(err) {
  if(err) console.log(err);
  console.log('finish!');
});
