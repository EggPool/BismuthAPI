"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const version = '1.0.0';
class BismuthNative {
    constructor({ server = '127.0.0.1', port = 5658, verbose = false }) {
        this.server = server, this.port = port, this.verbose = verbose;
        if (verbose)
            console.log(Date.now(), 'Connecting to node with', { server, port, verbose });
        // Generate promise that resolves when connection est.
        this.socket = new Promise((resolve, reject) => {
            let socket = net.createConnection({ host: server, port, writable: true, readable: true }, () => {
                if (verbose)
                    console.log('Connected to node !');
                return resolve(socket);
            });
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.verbose)
                console.log('Get connection is waiting on socket..');
            return yield this.socket;
        });
    }
    _prepareRpcPayload(data) {
        let dataToSend = JSON.stringify(data);
        return `${dataToSend.length.toString().padStart(10, '0')}${dataToSend}`;
    }
    command(command, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let socket = yield this.getConnection();
            return new Promise((resolve, reject) => {
                let payload = this._prepareRpcPayload(command);
                if (this.verbose)
                    console.log('Sending Payload', payload);
                socket.write(payload);
                if (options && options.length)
                    options.forEach(option => socket.write(this._prepareRpcPayload(option.toString())));
                socket.on('data', (response) => {
                    if (this.verbose)
                        console.log('Recieved data from host', response.toString('utf8'));
                    try {
                        return resolve(JSON.parse(response.toString('utf8').substr(10)));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        });
    }
}
exports.BismuthNative = BismuthNative;
