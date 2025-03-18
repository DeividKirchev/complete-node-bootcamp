const url = require("url");
const http = require("http");
const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, "utf-8")
);
const slugify = require("slugify");
const replaceData = require("./starter/modules/replaceTemplate");

const slugs = data.map((el) => slugify(el.productName, { lower: true }));

const templateOverview = fs.readFileSync(
  `${__dirname}/starter/templates/overview.html`,
  "utf-8"
);

const templateCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/starter/templates/product.html`,
  "utf-8"
);



const server = http.createServer(async (req, res) => {
  console.log(req.url);
  const pathName = url.parse(req.url, true).pathname;

  switch (pathName) {
    case "/":
    case "/overview":
      const cards = [];
      data.map((el) => {
        cards.push(replaceData(templateCard, el));
      });
      const output = templateOverview.replaceAll(
        /{%PRODUCT_CARDS%}/g,
        cards.join("")
      );
      res.writeHead(200, { "content-type": "text/html" });
      res.end(output);
      break;
    case "/product":
      const id = +url.parse(req.url, true).query.id;
      const product = data.find((el) => el.id === id);
      if(!product) {
        res.writeHead(404, {
          "Content-type": "text/html",
          "my-own-header": "hello-world",
        });
        res.end("<h1>Product not found</h1>");
        return;
      }
      const outputProduct = replaceData(templateProduct, product);
      res.writeHead(200, { "content-type": "text/html" });
      res.end(outputProduct);
      break;
    case "/api":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(JSON.stringify(data));
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello-world",
      });
      res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
