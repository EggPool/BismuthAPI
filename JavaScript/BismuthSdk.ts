import { BismuthNative, BismuthNativeConstructorParam } from "./BismuthNative";

export const MIN_NODE_VERSION = '4.2.3.7';

type BlockNumber = number;
type Diffculty = String;
type Txn = string;
type Address = string;
type PrivateKey = string;
type PublicKey = string;
type Balance = number;

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

interface TxnDetails {
    openfield: string; // 'odd',
    hash: string; // 'K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj1NLDUycMABA4vxbOFtMzlJ4nVBwcbEVl9NGk6s4yiuF9yQf7AHaloIxV7bcD75UCFg+ZIv7LFxfxz/SJIXzKkdFj+udZkh0sYv5xLNjJZl3YvlbfTnqJvr64wUVCL21Qdg0uSGO3VHM54pQqbePfHldf2+4T2iEjXVDaaIURYunKKnBZvu5VDEeiJQBCNb90RU9sI5QO/pNPVYZgV4lhHQc6kTaxW2DipaiRTdvq2kEo9DsB+4CQJ7vi172nZ+lhk3+MCCe11iJmgLG2nDoRpBlyK3otu822zDKYNkQ2bOuus7Nc1FwGsSI8jjP72xwb0zhyQ8NoelHMnWjh61YYFjbagmiHkepq5if4jfRjMr1PDFU1C6IpeK7a2ZZNSTrKx/sq9uJJygo9RJoxsmh9cqhabxjOeymUh6wpxJ2HDaTp55a517I+JBaxQeNa3GC02RzG2iuJ5SFwB4SrlCv55adKPRzMQaeiy+eukVUouiC3gDeINDZBbHAYT/V+ox+SlXS3Npy9wS/75F3ftYsulMg/acABEoeWP2kEQgQvw5w3B39Hf5IN5jfIJR2Epv0uOVUkgctcE9WBaVOUirWRn3B4FZc/spF0I6IhdV6u7Wjt/A+FaZc=',
    fee: number; //0.01003,
    confirmations: number;// 38512,
    time: number; // 1521239985.03,
    txid: string;// 'K1iuKwkOac4HSuzEBDxmqb5dOmfXEK98BaWQFHltdrbDd0C5iIEbh/Fj',
    keep: number; // 0,
    amount: number; // 6,
    address: string; //'731337bb0f76463d578626a48367dfea4c6efcfa317604814f875d10',
    reward: number; // 0,
    blockheight: number; // 558742,
    blocktime: number; // 1521240118.32,
    blockhash: string;// '5013e53c9d77bfd9908122a22724eb9e6724ad82f4093173c3f88921',
    pubkey: string;// '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAkZLFa8wvHG5Z55UlV3yi\nxTHwQE1AxCDwl08iagAX5W0ANm3Bb+Ps02Ud2ecVmJ07vn9dacdNFxp1sMQ9CHIe\n6zNNfhZOBTa0eGPY5+4QsDr7BpMo/xZ5j1SDqQns8VGlHCZXRgenITeHrowqaO4G\nB3+JNmcY6hIxfcAcKbSig/cLWJCnkpDJpZLQLs4HQkm7FqY26/SpCFgLZzzKt9SZ\nABXyHMFAgVh5t/DHfk/UodhggsXIwGxMUbGu/dl1ou3AjPbqFhLR7WS/ERjNIRWa\nvz5q2OCEv+N/KdZlTfWlyWhZgwJJxu0V4Vt4wLxcI/P11jiQQpYc60bgSEZASb2/\n74ruMzZVy4XadxXWLzapWQXiHA8GKyfRkkFZdZst2H9bOMBl2niErZJHgG8Xhg2A\nQ6yAN/ihPEL/2V6SlSKAgf7SzHVFavDVaUOFOuWhsuzKT6RP/pWyfwmTlfQewwht\nxZgnANr0MUr9EWjq4KsCZOXl0WhNWUvxA1eEGitmIrm47HNfqERXA+C6yDsRRhhX\nWjdGZ0ovsPR561kxkbUjXJXMbhhziCJQ6VH/lEEfBwmewIKfRR+yLIdnsEMBw93+\n5G6L1z5yJOlYtNoZhgxO0EvRZGMeyutvofyD7twlr99wyAFP8SWFHXxnXEt6CZPh\nePWEt9BX/fn/0kQq+UMMp0cCAwEAAQ==\n-----END PUBLIC KEY-----',
    blockminer: string;// 'b54317cb538c6b3a5ae8b84f8b53c83652037038ad8ad6bef4c8b43a',
    recipient: string;// '340c195f768be515488a6efedb958e135150b2ef3e53573a7017ac7d' }

}

interface AddressBalanceInfo {
    [address:string] : Balance;
}

export class BismuthSdk extends BismuthNative {

    constructor(cfg: BismuthNativeConstructorParam) {
        super(cfg);
        this.getStatus().then(({ walletversion }) => {
            if (parseInt(walletversion.split('.').join('')) < parseInt(MIN_NODE_VERSION.split('.').join('')))
                console.warn(`Your Bismuth wallet node is too old. Some API functions might not work !! \n Minimum version required is ${MIN_NODE_VERSION}`)
        })
    }

    public async getStatus(): Promise<NodeStatusPayload> {
        return await this.command('statusjson')
    }

    public async getBlock(blockNumbers: BlockNumber[]): Promise<string[] | number[]> {
        return await this.command('blockget', blockNumbers)
    }

    public async getLastDifficulty(): Promise<[BlockNumber, Diffculty]> {
        return await this.command('difflast');
    }

    public async getTxnDetails(txn: [Txn, boolean]): Promise<TxnDetails> {
        return await this.command('api_gettransaction', txn);
    }

    public async getAddressListBalance(addressList: [Address[], number, boolean]): Promise<any> {
        return await this.command('api_listbalance', addressList);
    }

    public async getNewKeys(): Promise<[PrivateKey, PublicKey, Address]> {
        return await this.command('keygen');
    }
}
