import { FC } from "react";
import styles from './modal-overlay.module.css';

interface IModalOverlay {
    onClick: () => void
}

export const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick} />
    )
}