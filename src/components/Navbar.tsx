import { Button } from "@/components/ui/button"
import { Wallet, Sun, Moon } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <Link href="/" className={`text-xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>SecurePurse</Link>
        </div>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link href="#features" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Features</Link></li>
            <li><Link href="#cta" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Get Started</Link></li>
          </ul>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className={`ml-4 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}