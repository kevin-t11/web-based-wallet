'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Globe, Lock, RefreshCcw, Smartphone, Eye } from 'lucide-react'
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-4">Secure and Easy Crypto Management</h1>
          <p className="text-xl text-blue-600 dark:text-blue-400 mb-8">Access your cryptocurrencies anytime, anywhere with our web-based wallet.</p>
          <Button onClick={() => router.push('/wallet')} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-lg py-6 px-8">
            Get Started <span><FaRegArrowAltCircleRight /></span>
          </Button>
        </div>
      </section>

      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 text-center mb-12">Why Choose Our Web Wallet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-blue-600">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle className="text-xl font-semibold">Secure Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your funds are protected with state-of-the-art encryption and security measures.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-blue-600">
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle className="text-xl font-semibold">Fast Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Send and receive cryptocurrencies with lightning-fast speed.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-blue-600">
              <CardHeader>
                <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle className="text-xl font-semibold">Multi-Chain Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage your Ethereum and Solana assets in one convenient place.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-100 dark:bg-gray-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Generate Wallet</h3>
                <p>Create a new wallet with generated private and public keys for maximum security.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <RefreshCcw className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Import Wallet</h3>
                <p>Import an existing wallet using your recovery phrase, providing seamless access.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Toggle Visibility</h3>
                <p>Control the visibility of your private keys and recovery phrases for added security.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">Copy to Clipboard</h3>
                <p>Quickly copy keys and phrases with a single click for easy management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-600 dark:text-blue-400 mb-8">Join thousands who trust our wallet for crypto needs.</p>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-lg py-6 px-8">
            Create Your Wallet Now
          </Button>
        </div>
      </section>

      <footer className="bg-blue-50 dark:bg-gray-900 py-7">
        <div className="container mx-auto px-4 text-center text-blue-600 dark:text-blue-400">
          <p>&copy; 2024 <span className="font-bold">SecurePurse</span> Web Wallet. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
