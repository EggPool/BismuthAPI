import { BismuthNative ,BismuthNativeConstructorParam } from "./BismuthNative";

type BlockNumber = number;
type Diffculty = String;
type Txn = string;
type Address = string;
type PrivateKey = string;
type PublicKey = string;

interface NodeStatusPayload {
    timeoffset: number// 0,
    uptime: number // 2533,
    consensus: number//598396,
    difficulty: Diffculty//110.0921201303,
    connections: number// 6,
    threads: number // 13,
    protocolversion: string // 'mainnet0016',
    blocks: BlockNumber // 598396,
    consensus_percent: number // 100,
    walletversion: string // '4.2.3.1',
    testnet: boolean // false 
}

export class BismuthSdk extends BismuthNative {

    constructor(cfg:BismuthNativeConstructorParam){
        super(cfg);
    }

    public async getStatus():Promise<NodeStatusPayload>{
        return await this.command('statusjson')
    }

    public async getBlock(blockNumbers:BlockNumber[]):Promise<string[]|number[]>{
        return await this.command('blockget',blockNumbers)
    }

    public async getLastDifficulty():Promise<[BlockNumber,Diffculty]>{
        return await this.command('difflast');
    }

    public async getTxnRaw(txn:[Txn,boolean]):Promise<any>{
        return await this.command('api_gettransaction',txn);
    }

    public async getAddressListBalance(addressList:[Address[],number,boolean]):Promise<any>{
        return await this.command('api_listbalance',addressList);
    }

    public async getNewKeys():Promise<[PrivateKey,PublicKey,Address]>{
        return await this.command('keygen');
    }
}
