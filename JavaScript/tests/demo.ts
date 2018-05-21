import { expect } from 'chai'
import { BismuthNative } from '../BismuthNative';
import {BismuthSdk} from '../BismuthSdk';


const cfg = {
    server: '127.0.0.1',
    port: 5658,
    verbose: false
};

let bis:BismuthNative;

describe("BismuthNative Class Test", () => {
    
    before(()=>{
        bis = new BismuthNative(cfg);
    })
    
    it("Establish a connection with local node", async () => {
        let socket = await bis.getConnection();
        expect(socket).to.be.an('Object');
        // Should be connected at this point
        expect(socket.connecting).to.be.false;
        return socket;
    })

    it("Can issue a command on socket and wallet version is ok",async()=>{
        let result = await bis.command('statusjson')
        expect(result).to.be.haveOwnProperty('blocks');
        expect(parseInt(result.walletversion.split('.').join(''))).to.be.greaterThan(4237)
        return result;
    })
})

let sdk:BismuthSdk;

describe("Bismuth SDK test : ",()=>{
    before(()=>{
        sdk = new BismuthSdk(cfg);
    })

    /**
     * Intentionally pause 200ms between each test so not to 
     * flood node
     */
    beforeEach((done)=>{
        setTimeout(done,100);
    })

    it("Can Get node status",async()=>{
        let result = await sdk.getStatus();
        expect(result).to.be.haveOwnProperty('blocks');
        return result;

    })

    it("Can Get a block's  details",async()=>{
        let result = await sdk.getBlock([558742]);
        expect(result).to.be.an('Array');
        result.forEach(result=>expect(result).to.have.length(12));
        return result;

    })

    it("Can Get last difficulty",async()=>{
        let result = await sdk.getLastDifficulty();
        expect(result).to.be.an('Array');
        let [blockNumber,difficulty] = result;
        expect(blockNumber).to.be.a('Number');
        expect(difficulty).to.be.a('String');
        return result;

    })

    it("Can Get a Transaction JSON details",async()=>{
        let result = await sdk.getTxnDetails(['K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj', true]);
        expect(result).to.be.an('Object');
        expect(result).to.haveOwnProperty('txid');
        return result;

    })
  
   it("Can Get an list of addreses balances",async()=>{
        let addressList = ['731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10','340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d'];
        let result = await sdk.getAddressListBalance([ addressList, 0, true]);
        expect(result).to.be.an('Object');
        expect(result).to.have.all.keys(...addressList)
        return result;

        // this is slow
    }).timeout(5000);
    
    it("Can generate new keys",async()=>{
        let result = await sdk.getNewKeys();
        expect(result).to.be.an('Array');

        let [privateKey,publicKey,address] = result;
        expect(privateKey).to.include('PRIVATE');
        expect(publicKey).to.include('PUBLIC');
        expect(address).to.have.length(56);

        return result;

    })
})