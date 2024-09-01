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
    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    const data = {
      trimmedPath,
      method,
      queryStringObject,
      headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000');
});

const handlers = {};

handlers.sample = (data, callback) => {
  callback(406, { name: 'sample handler' });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

const router = {
  sample: handlers.sample,
};
