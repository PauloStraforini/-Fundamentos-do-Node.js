import { randomUUID } from 'crypto';
import { Database } from './database.js';
import buildRoutePath from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (request, res) => {
           const users = database.select('users');

           return res.end(JSON.stringify(users));
        }
        
    },

    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { Name, email } = req.body;
        
            const user = {
                id: randomUUID(),
                Name,
                email,
            };
        
            database.insert('users', user);
        
            return res.writeHead(201).end();
        }
    },

    {
    method: 'DELETE',
    path: buildRoutePath ('/users/:id'),
    handler: (req, res) => {
        const {id} = req.params;
        database.delete('users', id);

        return res.writeHead(204).end();
    },

    },

    {
        method: 'PUT',
        path: buildRoutePath ('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params;
            const {Name, email} = req.body;

            database.update('users', id, {     
                Name,
                email,
            })
            
    
            return res.writeHead(204).end();
        },
    
        }
];