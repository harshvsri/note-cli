import http from "node:http";
import open from "open";

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Opening server on port ${port}...`);
  });
  open(`http://localhost:${port}`);
};
