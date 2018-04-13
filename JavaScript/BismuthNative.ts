
import io from 'socket.io-client';
import * as net from 'net';

const version = '1.0.0';

export interface BismuthNativeConstructorParam {
    server: string //'127.0.0.1'
    port: number // 5658, 
    verbose: boolean // false
}

export class BismuthNative {

    private server: string;
    private port: number;
    private verbose: boolean;
    protected socket: net.Socket;

    public constructor({ server = '127.0.0.1', port = 5658, verbose = false }: BismuthNativeConstructorParam) {
        this.server = server, this.port = port, this.verbose = verbose;

        if (verbose)
            console.log(Date.now(), 'Connecting to node with', { server, port, verbose });

        // Generate promise that resolves when connection est.
        this.socket = new Promise((resolve, reject) => {
            let socket = net.createConnection({ host: server, port, writable: true, readable: true }, () => {
                if(verbose)
                    console.log('Connected to node !');
                return resolve(socket);
            })
        })
    }

    public async getConnection(): Promise<net.Socket> {
        if (this.verbose)
            console.log('Get connection is waiting on socket..');
        return await this.socket;
    }

    private _prepareRpcPayload(data) {
        let dataToSend = JSON.stringify(data);
        return `${dataToSend.length.toString().padStart(10, '0')}${dataToSend}`
    }

    public async command(command: string, options?: string[]|number[]): Promise<any> {
        let socket = await this.getConnection();
        return new Promise((resolve, reject) => {
            let payload = this._prepareRpcPayload(command);
            if (this.verbose)
                console.log('Sending Payload', payload);
            
            socket.write(payload);

            if(options && options.length)
                options.forEach(option=> socket.write(this._prepareRpcPayload(option.toString())));

            socket.on('data', (response) => {
                if (this.verbose)
                    console.log('Recieved data from host', response.toString('utf8'));
                try {
                    return resolve(JSON.parse(response.toString('utf8').substr(10)));
                } catch(err){
                    reject(err)
                }
            });
        })
    }
}