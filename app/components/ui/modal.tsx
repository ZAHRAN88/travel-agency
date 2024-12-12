import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        {children}
      </motion.div>
    </div>
  );
}; 