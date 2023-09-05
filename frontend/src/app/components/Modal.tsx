"use client"

import React from 'react';
import cn from 'classnames';

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open }) => {
    const modalClass = cn({
        'modal modal-open': open,
        'modal modal-closed': !open,
    });

    return (
        <div className={modalClass}>
            <div className="modal-box">{children}</div>
        </div>
    );
};

export default Modal