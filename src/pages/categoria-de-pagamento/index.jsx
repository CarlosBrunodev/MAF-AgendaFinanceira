import Header from "../../components/Header";
import Heading, { HeadingLine } from "../../components/Heading";
import Button, { ButtonIcon } from "../../components/Button";
import SideModal from "../../components/SideModal";
import moment from "moment";
import { useEffect, useState } from "react";
import AppNav from "../../components/AppNav";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import Input, { InputMask, Select } from "../../components/Input";
import Mask from "react-input-mask";
import Card from "../../components/Card"
import { getSession } from "next-auth/client";
import api from "../../services/api"
export default function CondPag({ session }) {
  const { register, handleSubmit, setValue, watch, errors, control } = useForm();

  const [show, showModal] = useState(false);
  const [showEditar, showModalEditar] = useState(false);
  const [categoria, setCategoriaPag] = useState([]);
  const [pay_category_id, setCategoriaPagId] = useState("");

  const onSubmit = (data) => {
    api
      .post("/insertCondPag", {
        ...data,
        user_id: session.user.id
      })
      .then((response) => {
        console.log(response.data)
        alert(response.data.data)
        window.location.reload(true)
      });
  };

  useEffect(() => {
      api
      .post("/selectCondPag",{ user_id: session.user.id})
      .then((response) => {
        setCategoriaPag(response.data)
      });
  }, []);

  const onSubmit2 = (data) => {
    api
      .put("/updateCondPag", {
        ...data,
        pay_category_id: pay_category_id
      })
      .then((response) => {
        console.log(response.data)
        alert(response.data.data)
        window.location.reload(true)
      });
  };


  
  function editar({pay_category_id, pay_category_desc}){
      console.log(pay_category_desc)
    setCategoriaPagId(pay_category_id)
    showModalEditar(true)

    setTimeout(function(){ 
        setValue("nome", pay_category_desc);
    }, 50);

  }
   

  return (
    <>
      <AppNav>
        <SideModal isOpen={show} onClose={showModal}>
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            <div className="absolute inset-0 px-4 sm:px-6">
              <div className="h-full " aria-hidden="true">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                >
                  <div className="p-5 w-full text-left flex flex-col">
                    <div className="flex items-center justify-between">
                      <HeadingLine size="text-lg" color="text-gray-700" weight="thin">
                        Nova categoria de pagamento
                      </HeadingLine>
                    </div>

                   
                      <Input
                        refs={register({ required: true })}
                        error={errors.nome && "border-red-500"}
                        weight="font-medium"
                        label="Nome"
                        placeholder="Nome"
                        name="nome"
                        type="text"
                      >
                        {errors.nome && (
                          <span className="text-sm text-red-500">
                            Este campo é obrigatório
                          </span>
                        )}
                      </Input>

                    <Button color="bg-yellow-500" hoverColor="bg-yellow-600">
                      Salvar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SideModal>


        <SideModal isOpen={showEditar} onClose={showModalEditar}>
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            <div className="absolute inset-0 px-4 sm:px-6">
              <div className="h-full " aria-hidden="true">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit2)}
                  method="POST"
                >
                  <div className="p-5 w-full text-left flex flex-col">
                    <div className="flex items-center justify-between">
                      <HeadingLine size="text-lg" color="text-gray-700" weight="thin">
                        Editar categoria de pagamento
                      </HeadingLine>
                    </div>

                    <div className="mb-5">
                      <Input
                        refs={register({ required: true })}
                        error={errors.nome && "border-red-500"}
                        weight="font-medium"
                        label="Nome"
                        placeholder="Nome"
                        name="nome"
                        type="text"
                      >
                        {errors.nome && (
                          <span className="text-sm text-red-500">
                            Este campo é obrigatório
                          </span>
                        )}
                      </Input>
                    </div>


                    <Button color="bg-yellow-500" hoverColor="bg-yellow-600">
                      Salvar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SideModal>

        <div className="flex bg-gray-50 overflow-x-hidden h-full">
          <div className="h-full w-full bg-white">
            <div className="flex flex-col p-10">
              <div className="flex items-center justify-between">
                <HeadingLine
                  color="text-gray-700"
                  size="text-3xl"
                  weight="font-medium"
                  lineColor="border-yellow-400"
                >
                    Categoria de pagamento
                </HeadingLine>
                <ButtonIcon
                  size="w-36"
                  onClick={() => showModal(!show)}
                  color="bg-yellow-500"
                  hoverColor="bg-yellow-600"
                >
                  <FiPlus size="22" color="white" />
                  <p className="ml-2">Adicionar</p>
                </ButtonIcon>
              </div>
              <div className="my-5">
                <div className="py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Nome
                          </th>
                          <th      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            <span className="sr-only">Ações</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                         {categoria.map((item) => (
                           <tr>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center">
                               <div className="text-sm font-medium text-gray-900">
                                 {item.pay_category_desc}
                               </div>
                             </div>
                           </td>
                         
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                             <button
                             onClick={() => editar(item)}
                             className="text-indigo-600 hover:text-indigo-900"
                             >
                               Editar
                             </button>
                           </td>
                         </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppNav>
    </>
  );
}

CondPag.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getSession({ req });

if (session)  {
    return {session:session};
  }else{
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

}