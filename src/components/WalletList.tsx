import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { Trash, Eye, EyeOff, Copy } from "lucide-react"
import { toast } from "sonner"

interface Wallet {
  publicKey: string
  privateKey: string
  mnemonic: string
  path: string
  blockchain: string
}

interface WalletListProps {
  wallets: Wallet[]
  gridView: boolean
  visiblePrivateKeys: boolean[]
  togglePrivateKeyVisibility: (index: number) => void
  handleDeleteWallet: (index: number) => void
  darkMode: boolean
}

export default function WalletList({ wallets, gridView, visiblePrivateKeys, togglePrivateKeyVisibility, handleDeleteWallet, darkMode }: WalletListProps) {
  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content)
    toast.success(`${type} copied to clipboard!`)
  }

  const blockchainNames: { [key: string]: string } = {
    "501": "Solana",
    "60": "Ethereum",
  }

  return (
    <div
      className={`grid gap-6 grid-cols-1 col-span-1 ${
        gridView ? "md:grid-cols-2 lg:grid-cols-3" : ""
      }`}
    >
      {wallets.map((wallet: Wallet, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + index * 0.1,
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`flex flex-col rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-blue-200 bg-white'}`}
        >
          <div className="flex justify-between px-8 py-6">
            <div>
              <h3 className={`font-bold text-2xl md:text-3xl tracking-tighter ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
                Wallet {index + 1}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                {blockchainNames[wallet.blockchain]}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex gap-2 items-center ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                >
                  <Trash className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'}`}>
                <AlertDialogHeader>
                  <AlertDialogTitle className={darkMode ? 'text-gray-100' : 'text-blue-800'}>
                    Are you sure you want  to delete this wallet?
                  </AlertDialogTitle>
                  <AlertDialogDescription className={darkMode ? 'text-gray-300' : 'text-blue-600'}>
                    This action cannot be undone. This will permanently
                    delete your wallet and keys from local storage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteWallet(index)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className={`flex flex-col gap-8 px-8 py-4 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex flex-col w-full gap-2">
              <span className={`text-lg md:text-xl font-bold tracking-tighter ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
                Public Key
              </span>
              <div className="flex justify-between items-center">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-blue-600'} truncate`}>
                  {wallet.publicKey}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => copyToClipboard(wallet.publicKey, "Public key")}
                  className={darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className={`text-lg md:text-xl font-bold tracking-tighter ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
                Private Key
              </span>
              <div className="flex justify-between items-center">
                <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-blue-600'} truncate`}>
                  {visiblePrivateKeys[index]
                    ? wallet.privateKey
                    : "•".repeat(wallet.mnemonic.length)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
                    className={darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}
                  >
                    <Copy className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => togglePrivateKeyVisibility(index)}
                    className={darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}
                  >
                    {visiblePrivateKeys[index] ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}