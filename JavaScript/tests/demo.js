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
const chai_1 = require("chai");
const BismuthNative_1 = require("../BismuthNative");
const BismuthSdk_1 = require("../BismuthSdk");
const cfg = {
    server: '127.0.0.1',
    port: 5658,
    verbose: false
};
let bis;
describe("BismuthNative Class Test", () => {
    before(() => {
        bis = new BismuthNative_1.BismuthNative(cfg);
    });
    it("Establish a connection with local node", () => __awaiter(this, void 0, void 0, function* () {
        let socket = yield bis.getConnection();
        chai_1.expect(socket).to.be.an('Object');
        // Should be connected at this point
        chai_1.expect(socket.connecting).to.be.false;
        return socket;
    }));
    it("Can issue a command on socket", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield bis.command('statusjson');
        chai_1.expect(result).to.be.haveOwnProperty('blocks');
        return result;
    }));
});
let sdk;
describe("Bismuth SDK test : ", () => {
    before(() => {
        sdk = new BismuthSdk_1.BismuthSdk(cfg);
    });
    /**
     * Intentionally pause 200ms between each test so not to
     * flood node
     */
    beforeEach((done) => {
        setTimeout(done, 200);
    });
    it("Can Get node status", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getStatus();
        chai_1.expect(result).to.be.haveOwnProperty('blocks');
        return result;
    }));
    it("Can Get a block's  details", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getBlock([558742]);
        chai_1.expect(result).to.be.an('Array');
        result.forEach(result => chai_1.expect(result).to.have.length(12));
        return result;
    }));
    it("Can Get last difficulty", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getLastDifficulty();
        chai_1.expect(result).to.be.an('Array');
        let [blockNumber, difficulty] = result;
        chai_1.expect(blockNumber).to.be.a('Number');
        chai_1.expect(difficulty).to.be.a('String');
        return result;
    }));
    xit("Can Get a Transaction RAW details", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getTxnRaw(['K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', false]);
        chai_1.expect(result).to.be.an('Array');
        console.log('result', result);
        return result;
    }));
    xit("Can Get a Transaction JSON details", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getTxnRaw(['K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', true]);
        chai_1.expect(result).to.be.an('Array');
        console.log('result', result);
        return result;
    }));
    xit("Can Get an list of addreses balances", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getAddressListBalance([
            ['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10', '340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'],
            0, true
        ]);
        chai_1.expect(result).to.be.an('Array');
        console.log('result', result);
        return result;
    }));
    it("Can genearte new keys", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield sdk.getNewKeys();
        chai_1.expect(result).to.be.an('Array');
        let [privateKey, publicKey, address] = result;
        chai_1.expect(privateKey).to.include('PRIVATE');
        chai_1.expect(publicKey).to.include('PUBLIC');
        chai_1.expect(address).to.have.length(56);
        return result;
    }));
});
