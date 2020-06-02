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

          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/plain');

          if (url === '/balance') {
              const balance = getTotalBalance();
              response.write(balance.toString());
          }

          response.end();
        });
    });

    server.listen(5000);
}

function save(data:string):void {
    if (!data) {
      console.log('Save error: There is no data!');
      return;
    }

    const body = JSON.parse(data);
    if (!body.name || !body.wallet) {
      console.log('Save error: Wrong data!');
      return;
    }

    const wallet = Wallet.parse(body.wallet);
    results.set(body.name, wallet);

    console.log('Saved!');
}

function getTotalBalance():number {
    let total = 0;
    for (const wallet of results.values()) {
      total += wallet.balance(Date.now());
    }
    return total;
}

startServer();