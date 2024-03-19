import path from 'path';
import os from 'os';
import fs from 'fs';
import yaml from 'yaml';
import { Keypair } from '@solana/web3.js';

export const DEVNET_URL = 'https://api.devnet.solana.com';

function getConfig() {
    const configFilePath = path.resolve(
        os.homedir(),
        '.config',
        'solana',
        'cli',
        'config.yml'
    );
    console.log('path: ', configFilePath);

    const configYaml = fs.readFileSync(configFilePath, { encoding: 'utf8' });
    return yaml.parse(configYaml);
}

export function getRpcUrl() {
    try {
        const config = getConfig();
        if (!config.json_rpc_url) {
            throw new Error();
        }
        return config.json_rpc_url;
    } catch (e) {
        console.warn(
            'Failed to find the rpc url from CLI config. falling back to dev net url'
        );

        return DEVNET_URL;
    }
}

export function getKeyPair(): Keypair {
    try {
        const config = getConfig();
        console.log(config.keypair_path);
        if (!config['keypair_path']) {
            throw new Error('Missing key pair path');
        }
        return createKeyPairFromFile(config.keypair_path);
    } catch (e) {
        console.warn(
            'Failed to create keypair from CLI config file. falling back to new random keypair'
        );
        return Keypair.generate();
    }
}

function createKeyPairFromFile(filePath: string) {
    const secretKeyString = fs.readFileSync(filePath, { encoding: 'utf8' });
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    return Keypair.fromSecretKey(secretKey);
}
