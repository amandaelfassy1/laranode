const http = require("http");
const router = require("./routes");
const PORT = 5000;

const server = http.createServer((req, res) => {
  const route_name = req.url.split("/")[1];
  if (route_name == "users") {
    switch (req.method) {
      case "GET":
        router.get(req, res);
        break;
      case "POST":
        router.post(req, res);
        break;
      case "DELETE":
        router.delete(req, res);
        break;
      case "PUT":
        router.put(req, res);
        break;
      default:
        res.statusCode = 405;
        res.write("Method not allowed");
        res.end();
    }
  } else if (route_name == "") {
    res.write("index");
    res.end();
  } else {
    res.statusCode = 404;
    res.write("File not found");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
