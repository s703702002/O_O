const fs = require('fs');

// 要產幾筆資料
const len = process.argv[2] || 1000;

const json = [];

for (let i = 0; i < len; i++) {
  const product = {
    id: i,
    title: `商品${i}`,
    price: Math.floor(Math.random() * 10000),
    inventory: Math.floor(Math.random() * 100),
    gender: (Math.random() > 0.5) ? 0 : 1,
  };
  json.push(product);
}

fs.writeFile('./api/products.json', JSON.stringify(json), function(err) {
  if(err) console.log(err);
  console.log('finish!');
});
