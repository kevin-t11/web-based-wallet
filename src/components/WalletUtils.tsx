import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import bs58 from "bs58"
import { ethers } from "ethers"
import nacl from "tweetnacl"

interface Wallet {
  publicKey: string
  privateKey: string
  mnemonic: string
  path: string
}

export function generateWalletFromMnemonic(
  pathType: string,
  mnemonic: string,
  accountIndex: number
): Wallet | null {
  try {
    const seedBuffer = mnemonicToSeedSync(mnemonic)
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"))

    let publicKeyEncoded: string
    let privateKeyEncoded: string

    if (pathType === "501") {
      // Solana
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed)
      const keypair = Keypair.fromSecretKey(secretKey)

      privateKeyEncoded = bs58.encode(secretKey)
      publicKeyEncoded = keypair.publicKey.toBase58()
    } else if (pathType === "60") {
      // Ethereum
      const privateKey = Buffer.from(derivedSeed).toString("hex")
      privateKeyEncoded = privateKey

      const wallet = new ethers.Wallet(privateKey)
      publicKeyEncoded = wallet.address
    } else {
      console.error("Unsupported path type.")
      return null
    }

    return {
      publicKey: publicKeyEncoded,
      privateKey: privateKeyEncoded,
      mnemonic,
      path,
    }
  } catch (error) {
    console.error("Failed to generate wallet. Please try again.", error)
    return null
  }
}