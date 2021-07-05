import { FiUsers, FiCalendar,FiLayers, FiUser, FiTrendingUp, FiPower } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/client";
import { RiHandCoinLine } from "react-icons/ri";
import { AiOutlinePartition } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import Link from "next/link";

const AppNav = ({children}) => (
  <>
   
<div className="flex flex-row h-full">
  
      <nav className="bg-blue-500 w-20  justify-between flex flex-col ">
        <div className="mt-10 mb-10">
          <a href="#">
            <img
              src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
              className="rounded-full w-10 h-10 mb-3 mx-auto"
            />
          </a>
          <div className="mt-10">
            <ul>
              <li title="Dashboard" className="mb-6">
                <Link shallow href="/dashboard">
                  <FiTrendingUp className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>

              <li title="Agenda" className="mb-6">
                <Link shallow href="/agenda">
                  <FiCalendar  className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>

              <li title="Clientes" className="mb-6">
                <Link shallow href="/clientes">
                  <FiUsers className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>
           
              
              <li title="Contas a Pagar" className="mb-6">
                <Link shallow href="/contas-a-pagar">
                  <RiHandCoinLine className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>



              <li title="Centro de Custo" className="mb-6">
                <Link shallow href="/centro-de-custo">
                  <IoWalletOutline className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>

              <li title="Categoria de Pagamento" className="mb-6">
                <Link shallow href="/categoria-de-pagamento">
                  <AiOutlinePartition className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>


              <li title="Fornecedores" className="mb-6">
                <Link shallow href="/fornecedores">
                  <FaHandshake className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </Link>
              </li>

              <li className="mb-6">
               {/* <a href="/usuarios">
                  <FiUsers className="w-full flex justify-center cursor-pointer" size="24" color="#ffffff" />
                </a> */}
              </li>
            </ul>
          </div>
        </div>
        <div title="Sair" className="mb-4">
            <button className="w-full flex justify-center cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>
              <FiPower  size="24" color="#ffffff" />
            </button>
        </div>
      </nav>
      <div className="py-4 text-gray-700 bg-gray-50 h-screen w-screen">
       {children}
      </div>
    </div>
  </>
)

export default AppNav