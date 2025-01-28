import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Toaster = ({ message, isError, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {

            const timer = setTimeout(() => {
                onClose()
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose])
    console.log(isError)
    return (
        <div>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{backgroundColor:isError ? 'red': 'green'}}
                        className={`fixed top-5 right-5 z-50 flex items-center space-x-4 rounded-2xl px-4 py-3 shadow-lg text-white ${isError ? 'bg-red-500' : 'bg-green-500'
                            }`}
                    >
                        <p className="text-sm font-medium">{message}</p>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            <X className="h-4 w-4 text-black" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Toaster