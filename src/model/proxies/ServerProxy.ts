import axios from 'axios';
import { Wallet } from '@/model/data/Wallet';

export class ServerProxy {

    private static http = axios.create({
        baseURL: 'http://localhost:5000',
    });

    private static async call (method:any, path:string, data:any) {
        return ServerProxy.http({
          method,
          headers: { 'content-type': 'text/plain' },
          url: path,
          data,
        }).then((req:any) => {
          return req.data
        }).catch(() => {
          return null
        });
    }

    public static async save (name:string, wallet:Wallet) {
        const obj = {
            name: name,
            wallet: wallet
        };
        const data = JSON.stringify(obj);
        await ServerProxy.call('POST', '/save', data);
    }

    public static async getWorldBalance () {
        return await ServerProxy.call('GET', '/balance', null);
    }
}