import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className="toast show" role="alert">
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}
