import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useOrientation } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { ModalProps } from './ModalContainer.types';

export const ModalContainer = ({ children, open, onClose }: ModalProps) => {
  const { type: OrientationType } = useOrientation();

  return (
    <Dialog open={open} onClose={onClose} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 flex w-screen items-center justify-center p-4'>
        <DialogPanel
          transition
          className={clsx('max-h-3/4 relative bg-alabaster p-4 md:p-6', {
            'md:min-w-1/2':
              OrientationType === 'portrait-primary' || OrientationType === 'portrait-secondary',
            'md:min-w-2/3':
              OrientationType === 'landscape-primary' || OrientationType === 'landscape-secondary'
          })}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalContainer;
