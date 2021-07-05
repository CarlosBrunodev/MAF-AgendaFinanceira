import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState , useEffect} from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import axios from 'axios';
import {
  FiChevronDown
} from "react-icons/fi";

const Menu = ({ title, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();
  
  return (
    <header>
      <div className={`relative ${color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
            <div className="flex text-lg uppercase text-white py-2 justify-start lg:w-0 lg:flex-1">
              <p className="border-b-4 border-yellow-300 p-2">
                {title}
                </p>
            </div>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-white group focus:outline-none rounded-md inline-flex items-center text-base font-medium "
                  aria-expanded="false"
                >
                {session.user.email} <FiChevronDown />
                </button>

                <div className="absolute z-40 ">
                <Transition
                  show={isOpen}
                  enter="transition ease-out duration-95 transform"
                  enterFrom="scale-95"
                  enterTo="scale-100"
                  leave="transition ease-in duration-95 transform"
                >
                  {(ref) => (
                    <div
                      ref={ref}
                      className="absolute z-40 transform -translate-x-2/3	 mt-3 px-4 w-screen max-w-sm sm:px-0"
                    >
                      <div className="rounded-lg cursor-pointer shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">

                      <div className="relative grid gap-0 bg-white px-3 py-2 sm:gap-8 sm:p-8">
                          <Link href="/dashboard" >
                            <div className="-m-4 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <div className="ml-4">
                                Dashboard
                              </div>
                            </div>
                          </Link>
                        </div>

                      <div className="relative grid gap-0 bg-white px-3 py-2 sm:gap-8 sm:p-8">
                                {session && (
                                  <>
                          <div className="-m-4 p-3 flex items-start rounded-lg hover:bg-gray-50">
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                    <button onClick={() => signOut()}>
                                      Sign out
                                    </button>
                              </p>
                            </div>
                          </div>
                                  </>
                                )}
                             
                        </div>

                      
                      </div>
                    </div>
                  )}
                </Transition>
                </div>

                
              </div>
            ) : (
              <>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  {!session && (
                    <>
                      <button
                        className="whitespace-nowrap text-base focus:outline-none font-medium text-white	hover:text-gray-900"
                        onClick={() => signIn()}
                      >
                         Entrar
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </header>

  );
};

export default Menu;
