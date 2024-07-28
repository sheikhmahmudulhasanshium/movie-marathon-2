// components/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({  header, footer, children }) => {
  return (
    <div className="flex flex-col justify-between ">
          {header}
          {children}
          {footer}
      
    </div>
  );
};

export default Modal;
