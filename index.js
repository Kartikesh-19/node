const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  //   console.warn(req.headers);
  console.log(`request for` + req.url + `by method`, req.method);
  if (req.method == 'GET') {
    let fileURL;
    if (req.url == `/`) {
      fileURL = "/index.html";
    } else {
      fileURL = req.url;
    }
    let filePath = path.resolve(`./public` + fileURL);
    let flieExt = path.extname(filePath);
    if (flieExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            `<html>
      <body>
        <h1> PAge Not found: ` +
              fileURL +
              ` does not exists</h1>
      </body>
    </html>`
          );
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(
          `<html>
    <body>
      <h1> PAge Not found: ` +
            fileURL +
            ` not a html file</h1>
    </body>
  </html>`
        );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html>
<body>
  <h1> PAge Not found: ` +
        fileURL +
        ` Not Supported</h1>
</body>
</html>`
    );

  }
});
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
