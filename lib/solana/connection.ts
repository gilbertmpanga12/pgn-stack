import { Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from 'buffer';

const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const address = new PublicKey("8icXpLgEgEVVbvhTAgL7W7AUMZbaUh1UJ1czMiQXCuVE");

export const accountInfo = async (userAddress: string = '') => {
   try{
 const info = await connection.getAccountInfo(address);
 const lamports = await connection.getBalance(new PublicKey(userAddress));
 
    if (!info || !info.data) {
        return null;
    }

    const buffer = Buffer.from(info.data);
    
    const deserializedData = {
        firstUint32: buffer.readUInt32LE(0),
        
        secondUint32: buffer.readUInt32LE(4),
        
        remainingBytes: Array.from(buffer.slice(8)),
    };
    
    return {
        accountInfo: info,
        deserializedData,
        rawBuffer: buffer,
        myBalance: lamports
    }
   }catch(e){
    console.log('failed to get user info',e )
   }
};


export const anchorWallet = async () => {

}