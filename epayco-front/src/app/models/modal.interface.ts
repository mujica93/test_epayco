export class ModalProps {
    title!: string;
    message?: string;
    openModal?: boolean;
    onCloseManual?: () => void;
}