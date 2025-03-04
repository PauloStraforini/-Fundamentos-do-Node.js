import { json as parseJson } from "./middlewares/json.js"; // Renomeando para evitar conflito
import { Database } from "../database.js";
import http from 'node:http';

const database = new Database(); // Correção na instância

const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await parseJson(req, res); // Usando a função correta para processar JSON

    if (method === 'GET' && url === '/users') {
        const users = database.select('users'); // Obtendo usuários do banco

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(users));
    }
    
    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        const newUser = {
            id: Date.now(), // Criando um ID único
            name,
            email,
        };

        database.insert('users', newUser); // Inserindo no banco de dados

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newUser));
    }

    res.writeHead(404);
    res.end();
});

server.listen(3333, () => {
    console.log('Server running on port 3333');
});
