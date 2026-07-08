import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isConfirming: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isConfirming,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
}: ConfirmDialogProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles['confirm-dialog__overlay']} />
        <AlertDialog.Content className={styles['confirm-dialog__content']}>
          <AlertDialog.Title className={styles['confirm-dialog__title']}>{title}</AlertDialog.Title>
          <AlertDialog.Description className={styles['confirm-dialog__description']}>
            {description}
          </AlertDialog.Description>
          <div className={styles['confirm-dialog__actions']}>
            <AlertDialog.Cancel asChild>
              <button
                className={styles['confirm-dialog__cancel-button']}
                type="button"
                disabled={isConfirming}
              >
                {cancelLabel}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={styles['confirm-dialog__confirm-button']}
                type="button"
                onClick={onConfirm}
                disabled={isConfirming}
              >
                {isConfirming ? 'Удаление...' : confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
