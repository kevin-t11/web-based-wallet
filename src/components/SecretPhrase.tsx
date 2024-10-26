import React from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp, Copy } from "lucide-react"
import { toast } from "sonner"

interface SecretPhraseProps {
  showMnemonic: boolean
  setShowMnemonic: React.Dispatch<React.SetStateAction<boolean>>
  mnemonicWords: string[]
  darkMode: boolean
}

export default function SecretPhrase({ showMnemonic, setShowMnemonic, mnemonicWords, darkMode }: SecretPhraseProps) {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Secret phrase copied to clipboard!")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`group flex flex-col items-center gap-4 cursor-pointer rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-blue-200 bg-white'} p-8`}
    >
      <div
        className="flex w-full justify-between items-center"
        onClick={() => setShowMnemonic(!showMnemonic)}
      >
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}>
          Your Secret Phrase
        </h2>
        <Button
          onClick={() => setShowMnemonic(!showMnemonic)}
          variant="ghost"
          className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-blue-600 hover:text-blue-700'}`}
        >
          {showMnemonic ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </Button>
      </div>

      {showMnemonic && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col w-full items-center justify-center"
          onClick={() => copyToClipboard(mnemonicWords.join(" "))}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
          >
            {mnemonicWords.map((word, index) => (
              <p
                key={index}
                className={`md:text-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'} transition-all duration-300 rounded-lg p-4 ${darkMode ? 'text-gray-100' : 'text-blue-800'}`}
              >
                {word}
              </p>
            ))}
          </motion.div>
          <div className={`text-sm md:text-base ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-blue-500 group-hover:text-blue-700'} flex w-full gap-2 items-center transition-all duration-300`}>
            <Copy className="size-4" /> Click Anywhere To Copy
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}