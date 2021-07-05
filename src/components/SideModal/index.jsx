import { Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import Input, { CurrencyRow, Select } from "../Input";
import { HeadingLine } from "../Heading";
import Button from "../Button";
import currency from "currency.js";
import { FiSearch, FiRefreshCcw } from "react-icons/fi";
import axios from "axios";

const SideModal = ({isOpen, onClose, children}) => {
  const node = useRef();

  const handleClickOutside = (e) => {
   
    if (node.current.contains(e.target)) {
      return;
    } else {
      onClose(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Transition
    show={isOpen}
    enter="transition-opacity duration-250"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-250"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div
      className="fixed inset-0 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-900 bg-opacity-40 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button
                onClick={(e) => onClose(false)}
                className="rounded-sm transform text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close panel</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              ref={node}
              className="cursor-default	 h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
            >
             {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  )
}

 




export default SideModal