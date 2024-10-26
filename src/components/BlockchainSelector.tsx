'use client'

import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface BlockchainSelectorProps {
  setSelectedBlockchain: React.Dispatch<React.SetStateAction<string>>
  darkMode: boolean
}

export default function BlockchainSelector({ setSelectedBlockchain, darkMode }: BlockchainSelectorProps) {
  const handleSelectBlockchain = (blockchain: string) => {
    setSelectedBlockchain(blockchain)
    toast.success(`${blockchain === "501" ? "Solana" : "Ethereum"} blockchain selected. Please generate a wallet to continue.`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex gap-4 flex-col my-12"
    >
      <div className="flex flex-col gap-2">
        <h1 className={`tracking-tighter text-3xl md:text-4xl font-black ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
          SecurePurse supports multiple blockchains
        </h1>
        <p className={`font-semibold text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>
          Choose a blockchain to get started.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size={"lg"}
          onClick={() => handleSelectBlockchain("501")}
          className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold text-base`}
        >
          Solana
        </Button>
        <Button
          size={"lg"}
          onClick={() => handleSelectBlockchain("60")}
          className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold text-base`}
        >
          Ethereum
        </Button>
      </div>
    </motion.div>
  )
}