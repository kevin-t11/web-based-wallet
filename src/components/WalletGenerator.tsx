'use client'

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { generateMnemonic, validateMnemonic } from "bip39"
import { motion } from "framer-motion"
import { Grid2X2, List, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import BlockchainSelector from "./BlockchainSelector"
import MnemonicInput from "./MnemonicInput"
import SecretPhrase from "./SecretPhrase"
import WalletList from "./WalletList"
import { generateWalletFromMnemonic } from "./WalletUtils"

interface Wallet {
  publicKey: string
  privateKey: string
  mnemonic: string
  path: string
  blockchain: string
}

interface WalletGeneratorProps {
  darkMode: boolean;
}

export default function WalletGenerator({ darkMode }: WalletGeneratorProps) {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(" "))
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>("")
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false)
  const [mnemonicInput, setMnemonicInput] = useState<string>("")
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([])
  const [visiblePhrases, setVisiblePhrases] = useState<boolean[]>([])
  const [gridView, setGridView] = useState<boolean>(false)

  const blockchainNames: { [key: string]: string } = {
    "501": "Solana",
    "60": "Ethereum",
  }

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets")
    const storedMnemonic = localStorage.getItem("mnemonics")
    const storedBlockchain = localStorage.getItem("blockchain")

    if (storedWallets && storedMnemonic && storedBlockchain) {
      setMnemonicWords(JSON.parse(storedMnemonic))
      setWallets(JSON.parse(storedWallets))
      setSelectedBlockchain(storedBlockchain)
      setVisiblePrivateKeys(JSON.parse(storedWallets).map(() => false))
      setVisiblePhrases(JSON.parse(storedWallets).map(() => false))
    }
  }, [])

  const handleDeleteWallet = (index: number) => {
    const updatedWallets = wallets.filter((_, i) => i !== index)
    setWallets(updatedWallets)
    localStorage.setItem("wallets", JSON.stringify(updatedWallets))
    setVisiblePrivateKeys(visiblePrivateKeys.filter((_, i) => i !== index))
    setVisiblePhrases(visiblePhrases.filter((_, i) => i !== index))
    toast.success("Wallet deleted successfully!")
  }

  const handleClearWallets = () => {
    localStorage.removeItem("wallets")
    localStorage.removeItem("mnemonics")
    localStorage.removeItem("blockchain")
    setWallets([])
    setMnemonicWords([])
    setSelectedBlockchain("")
    setVisiblePrivateKeys([])
    setVisiblePhrases([])
    toast.success("All wallets cleared.")
  }

  const handleGenerateWallet = () => {
    let mnemonic = mnemonicInput.trim()

    if (mnemonic) {
      if (!validateMnemonic(mnemonic)) {
        toast.error("Invalid recovery phrase. Please try again.")
        return
      }
    } else {
      mnemonic = generateMnemonic()
    }

    const words = mnemonic.split(" ")
    setMnemonicWords(words)

    const wallet = generateWalletFromMnemonic(
      selectedBlockchain,
      mnemonic,
      wallets.length
    )
    if (wallet) {
      const updatedWallets = [...wallets, { ...wallet, blockchain: selectedBlockchain }]
      setWallets(updatedWallets)
      localStorage.setItem("wallets", JSON.stringify(updatedWallets))
      localStorage.setItem("mnemonics", JSON.stringify(words))
      localStorage.setItem("blockchain", selectedBlockchain)
      setVisiblePrivateKeys([...visiblePrivateKeys, false])
      setVisiblePhrases([...visiblePhrases, false])
      setMnemonicInput("")
      toast.success(`${blockchainNames[selectedBlockchain]} wallet generated successfully!`)
    }
  }

  const handleAddWallet = () => {
    if (!mnemonicWords) {
      toast.error("No mnemonic found. Please generate a wallet first.")
      return
    }

    const wallet = generateWalletFromMnemonic(
      selectedBlockchain,
      mnemonicWords.join(" "),
      wallets.length
    )
    if (wallet) {
      const updatedWallets = [...wallets, { ...wallet, blockchain: selectedBlockchain }]
      setWallets(updatedWallets)
      localStorage.setItem("wallets", JSON.stringify(updatedWallets))
      toast.success("Wallet added successfully!")
    }
  }

  const handleGoBack = () => {
    setSelectedBlockchain("")
    setMnemonicInput("")
    setWallets([])
    setMnemonicWords([])
    setShowMnemonic(false)
    setVisiblePrivateKeys([])
    setVisiblePhrases([])
    localStorage.removeItem("wallets")
    localStorage.removeItem("mnemonics")
    localStorage.removeItem("blockchain")
    toast.info("Returned to blockchain selection.")
  }

  return (
    <div className={`flex flex-col gap-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-50 text-blue-900'}`}>
      {!selectedBlockchain && (
        <BlockchainSelector setSelectedBlockchain={setSelectedBlockchain} darkMode={darkMode} />
      )}

      {selectedBlockchain && wallets.length === 0 && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center">
            <h2 className={`tracking-tighter text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
              {blockchainNames[selectedBlockchain]} Wallet
            </h2>
          </div>
          <MnemonicInput
            mnemonicInput={mnemonicInput}
            setMnemonicInput={setMnemonicInput}
            handleGenerateWallet={handleGenerateWallet}
            darkMode={darkMode}
          />
        </motion.div>
      )}

      {mnemonicWords && wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-8 mt-6"
        >
          <div className="flex md:flex-row flex-col justify-between w-full gap-4 md:items-center">
            <h2 className={`tracking-tighter text-3xl md:text-4xl font-extrabold ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
              {blockchainNames[selectedBlockchain]} Wallet
            </h2>
            <div className="flex gap-2">
              <Button
                variant="link"
                onClick={handleGoBack}
                className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}`}
              >
                <ArrowLeft className="h-4 w-4" /> Go Back
              </Button>
              {wallets.length > 1 && (
                <Button
                  variant={"ghost"}
                  onClick={() => setGridView(!gridView)}
                  className={`hidden md:block ${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  {gridView ? <Grid2X2 /> : <List />}
                </Button>
              )}
              <Button
                onClick={handleAddWallet}
                className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Add Wallet
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="self-end bg-red-600 hover:bg-red-700 text-white">
                    Clear Wallets
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className={darkMode ? 'text-gray-100' : 'text-gray-900'}>Are you sure you want to clear all wallets?</AlertDialogTitle>
                    <AlertDialogDescription className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                      This action cannot be undone. This will permanently delete all your wallets and keys from local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className={darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearWallets} className="bg-red-600 text-white hover:bg-red-700">Clear All</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {mnemonicWords && wallets.length > 0 && (
        <SecretPhrase
          showMnemonic={showMnemonic}
          setShowMnemonic={setShowMnemonic}
          mnemonicWords={mnemonicWords}
          darkMode={darkMode}
        />
        )}
          <WalletList
            wallets={wallets}
            gridView={gridView}
            visiblePrivateKeys={visiblePrivateKeys}
            togglePrivateKeyVisibility={(index: number) => {
              setVisiblePrivateKeys(
                visiblePrivateKeys.map((visible, i) => (i === index ? !visible : visible))
              )
            }}
            handleDeleteWallet={handleDeleteWallet}
            darkMode={darkMode}
          />
        </motion.div>
      )}
      
    </div>
  )
}