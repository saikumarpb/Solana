import {
    Connection,
    // LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { getKeyPair, getRpcUrl } from './utils';

const PROGRAM_ID = new PublicKey(
    'DNZTZoVDKi95RfdUCnfWpsd9r45pn3dnQEbJFvM3bf3Y'
);

let connection: Connection = new Connection(getRpcUrl());

const keyPair = getKeyPair();

// Uncomment to airdrop if needed.
// connection.requestAirdrop(getRpcUrl(), LAMPORTS_PER_SOL)

async function init() {
    const tx = new Transaction();
    let blockhash = (await connection.getLatestBlockhash('finalized'))
        .blockhash;
    tx.recentBlockhash = blockhash;
    tx.add(
        new TransactionInstruction({
            programId: PROGRAM_ID,
            data: Buffer.from([]),
            keys: [],
        })
    );
    tx.sign(keyPair);
    const txHash = await connection.sendRawTransaction(tx.serialize());
    console.log('Tx hash: ', txHash);
}
init();
