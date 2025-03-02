import http from 'http';
import { json } from './middlewares/json.js';

const users = []

const server = http.createServer((req, res) => {
   const { url, method } = req;

    json(req, res);

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .write(JSON.stringify(users))
    }

   if (method === 'POST' && url === '/users') {
    users.push({
        id: 1,
        Name,
        email
    })

    return res.writeHead('201').end();
    }

    return res.writeHead('404').end();
})

server.listen(3333);