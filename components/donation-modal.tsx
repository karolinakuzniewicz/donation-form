"use client";

import { MouseEventHandler, ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import givingBlockIcon from "../images/icons/giving-block.svg";
import closeIcon from "../images/icons/close.svg";

interface DonationModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DonationModal({
  isOpen,
  onClose,
  children,
}: DonationModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === backdropRef?.current) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 z-10 w-screen">
        <div
          ref={backdropRef}
          className="flex min-h-screen justify-center sm:items-center"
        >
          <div className="z-10 w-full sm:w-[37.5rem] max-w-5xl items-center justify-between text-slate-600">
            <div className="bg-orange-200 px-8 py-10 flex flex-col sm:flex-row gap-5 border border-transparent rounded-t-md">
              <button
                className="sm:hidden sm:hidden self-end p-2"
                onClick={() => onClose()}
              >
                <Image src={closeIcon} alt="" />
              </button>

              <Image src={givingBlockIcon} alt="" className="mx-auto sm:mx-0" />
              <div className="flex flex-col gap-1 justify-center mx-auto sm:mx-0">
                <h1 className="font-semibold text-2xl sm:text-3xl">
                  The giving block
                </h1>
                <h2>Set up your donation goal!</h2>
              </div>
            </div>
            <div className="bg-white h-full px-8 py-10 flex flex-col gap-8">
              {children}
              <div className="flex w-full gap-6">
                <div className="hidden sm:w-1/2 sm:block">
                  <button
                    onClick={() => onClose()}
                    className="flex items-center justify-center p-4 border border-indigo-950 rounded-md w-full font-semibold hover:bg-violet-50 hover:opacity-80"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
                <div className="w-full sm:w-1/2">
                  <button className="flex text-white items-center justify-center p-4 border border-indigo-950 bg-indigo-950 rounded-md w-full font-semibold hover:opacity-80">
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    window.document.body
  );
}
