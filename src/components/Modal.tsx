import { type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => (
  isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        {children}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-1 px-2 rounded">Close</button>
      </div>
    </div>
  ) : null
);

export default Modal;