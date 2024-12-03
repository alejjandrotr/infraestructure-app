import React, { ReactNode, useState } from 'react';
import Loader from '../Loader';
import { isDirty } from 'zod';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  handleSubmit?: any;
  onSubmit?: any;
  isLoading?: boolean;
  isValid?: boolean;
}
function Modal({
  isOpen,
  onClose,
  title,
  children,
  handleSubmit,
  onSubmit,
  isLoading = false,
  isValid,
}: ModalProps) {
  if (!isOpen) return null;

  const handleClose = onClose;

  return (
    <div>
      {isOpen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-y-auto">
              {' '}
               
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block   overflow-y-auto
 align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                {' '}
                 
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md   
 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Cerrar</span>  
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="">
                  <div className="text-center sm:mt-0 sm:ml-4 sm:flex sm:flex-1 sm:items-center sm:justify-center ">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 "
                      id="modal-title"
                    >
                      {title}
                    </h3>
                  </div>

                  <div className="text-center sm:mt-0 sm:ml-4 sm:flex sm:flex-1 sm:items-center sm:justify-center">
                    {!isLoading && <div className="mt-2">{children}</div>}
                    {isLoading && <Loader></Loader>}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent   
 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClose}
                  >
                    {' '}
                        Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm 
                                      px-4 py-2 
                              ${
                                isValid
                                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                  : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                              } 
                              sm:w-auto sm:text-sm`}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default Modal;
