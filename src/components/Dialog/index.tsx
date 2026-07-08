import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Dialog.module.scss';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export const DialogComponent = ({ open, onOpenChange, title, children }: DialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles['dialog__overlay']} />
        <Dialog.Content className={styles['dialog__content']}>
          <div className={styles['dialog__header']}>
            <Dialog.Title className={styles['dialog__title']}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles['dialog__close-button']} aria-label="Закрыть" type="button">
                ✕
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className={styles['dialog__description']}>{title}</Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
