'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import WalletGenerator from "@/components/WalletGenerator";
import { Toaster } from "sonner";

export default function WalletPage() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="flex-grow bg-blue-50 dark:bg-gray-900 p-4 md:p-8">
                <div className="max-w-4xl mx-auto mt-8">
                    <WalletGenerator darkMode={darkMode} />
                </div>
            </div>
            <Toaster toastOptions={{
                style: {
                    color: 'rgb(37, 99, 235)' 
                }
            }}/>
        </div>
    );
}
