import http from 'node:http';

const server = http.createServer((req, res) => { 
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res);
}); 

server.listen(3333); 