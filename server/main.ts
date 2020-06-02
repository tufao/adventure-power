import { Wallet } from "../src/model/data/Wallet";

const http = require('http');

const results:Map<string, Wallet> = new Map();

function startServer() {
    const server = http.createServer((request:any, response:any) => {
        const { headers, method, url } = request;
        let data:Uint8Array[] = [];
        request.on('error', (err:string) => {
          console.error(err);
        }).on('data', (chunk:Uint8Array) => {
          data.push(chunk);
        }).on('end', () => {
          if (url === '/save') {
              const body = Buffer.concat(data).toString();
              save(body);
          }

          // response.write('total results: ' + results.length);
          response.end();
        });
    });

    server.listen(5000);
}

function save(data:string) {
    if (!data) {
      return;
    }

    const body = JSON.parse(data);
    if (!body.name || !body.wallet) {
      return;
    }

    const wallet = Wallet.parse(body.wallet);
    results.set(body.name, wallet);
}

startServer();