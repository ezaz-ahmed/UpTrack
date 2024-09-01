import http from 'node:http';

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryStringObject = Object.fromEntries(
    parsedUrl.searchParams.entries()
  );
  const headers = req.headers;
  let buffer = '';

  req.on('data', (chunk) => {
    buffer += chunk;
  });

  req.on('end', () => {
    console.log({
      trimmedPath,
      method,
      queryStringObject,
      headers,
      buffer,
    });

    res.end('Hello World\n');
  });
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000');
});
