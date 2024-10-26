import React from "react"
import { motion } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface MnemonicInputProps {
  mnemonicInput: string
  setMnemonicInput: React.Dispatch<React.SetStateAction<string>>
  handleGenerateWallet: () => void
  darkMode: boolean
}

export default function MnemonicInput({ mnemonicInput, setMnemonicInput, handleGenerateWallet, darkMode }: MnemonicInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-4 my-12"
    >
      <div className="flex flex-col gap-2">
        <h1 className={`tracking-tighter text-4xl md:text-5xl font-black ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
          Secret Recovery Phrase
        </h1>
        <p className={`font-semibold text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>
          Save these words in a safe place.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="password"
          placeholder="Enter your secret phrase (or leave blank to generate)"
          onChange={(e) => setMnemonicInput(e.target.value)}
          value={mnemonicInput}
          className={`border-${darkMode ? 'gray-600' : 'blue-300'} focus:border-${darkMode ? 'blue-500' : 'blue-500'}`}
        />
        <Button
          size={"lg"}
          onClick={handleGenerateWallet}
          className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {mnemonicInput ? "Add Wallet" : "Generate Wallet"}
        </Button>
      </div>
    </motion.div>
  )
}