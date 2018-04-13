"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BismuthNative_1 = require("./BismuthNative");
class BismuthSdk extends BismuthNative_1.BismuthNative {
    constructor(cfg) {
        super(cfg);
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('statusjson');
        });
    }
    getBlock(blockNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('blockget', blockNumbers);
        });
    }
    getLastDifficulty() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('difflast');
        });
    }
    getTxnRaw(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('api_gettransaction', txn);
        });
    }
    getAddressListBalance(addressList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('api_listbalance', addressList);
        });
    }
    getNewKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command('keygen');
        });
    }
}
exports.BismuthSdk = BismuthSdk;
