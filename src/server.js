import http from 'http';

import { json } from "./middlewares/json.js"; // Inclua a extensão ".js"
import { routes } from './routes.js';


const server = http.createServer(async (req, res) => {
   const { url, method } = req;

   await json(req, res)

    const route = routes.find(route => {
       return route.method === method && route.path.test(url);
    })

    if (route) {
        const routeParameters = req.url.match(route.path);

        const params = { ...routeParameters.groups}

        return route.handler(req, res)
    }

    return res.writeHead(404).end();
})

server.listen(3333);