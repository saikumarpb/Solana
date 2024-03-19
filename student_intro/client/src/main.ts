import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { StudentIntro } from "./models/StudentIntro";
import { getKeyPair, getRpcUrl } from "./utils";

let keyPair = getKeyPair()

let connection = new Connection(getRpcUrl());

let PROGRAM_ID = new PublicKey("6amR9d6LPK53UmdN5nwyiqzchTDXBJzh9Lc9JvDS9tUJ")

let studentIntro = new StudentIntro("Sai", "Developer")

async function init() {
    let blockhash = await connection.getLatestBlockhash();
    let tx = new Transaction({...blockhash})
    tx.add(new TransactionInstruction({programId: PROGRAM_ID, data: studentIntro.serialize(), keys: []}))
    tx.sign(keyPair)
    const txHash = await connection.sendRawTransaction(tx.serialize())
    console.log(txHash)
}

init()