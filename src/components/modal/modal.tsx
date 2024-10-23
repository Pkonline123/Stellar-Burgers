import React, { FC, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

interface IModal {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
    title?: string
}


export const Modal: FC<IModal> = ({ children, isOpen, onClose, title }) => {

    const closeModal = useCallback(() => {
        onClose();
    }, [onClose]);

    React.useEffect(() => {

        function onKeyDown(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                closeModal()
            }
        }

        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [closeModal])

    return createPortal(
        <>
            {isOpen && (
                <>
                    <ModalOverlay onClick={closeModal} />
                    <div className={styles.modal}>
                        <div className={styles.titleContainer}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <CloseIcon type="primary" />
                            </button>
                            {title && <p className="text text_type_main-large">{title}</p>}
                        </div>
                        {children}
                    </div>

                </>
            )}
        </>,
        document.getElementById('modals') as HTMLDivElement
    )
}