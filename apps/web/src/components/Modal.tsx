"use client";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return <></>;
  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-scroll">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-50 mx-4 max-h-[90%] min-w-10 overflow-auto rounded bg-white p-4 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
