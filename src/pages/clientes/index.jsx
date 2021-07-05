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
export default function Clientes({ session }) {
  const { register, handleSubmit, setValue, watch, errors, control } = useForm();

  const [show, showModal] = useState(false);
  const [showEditar, showModalEditar] = useState(false);

  const [uf, setUf] = useState([]);
  const [locale, setLocale] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cepLocale, setCepLocale] = useState("");
  const [customer_identificador, setCustomer] = useState("");

  const onSubmit = (data) => {
    api
      .post("/insertCustomer", {
        ...data,
        user_id: session.user.id
      })
      .then((response) => {
        console.log(response.data)
        alert(response.data.data)
        window.location.reload(true)
      });
  };

  const onSubmit2 = (data) => {
    api
      .put("/updateCustomer", {
        ...data,
        customer_id: customer_identificador
      })
      .then((response) => {
        console.log(response.data)
        alert(response.data.data)
        window.location.reload(true)
      });
  };

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        setUf(response.data);
      });

      api
      .post("/selectCustomer",{ user_id: session.user.id})
      .then((response) => {
        setClientes(response.data)
      });
  }, []);

  useEffect(() => {
    if (Object.keys(locale).length > 0 && locale.constructor === Object) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${locale.uf}/municipios`
        )
        .then((response) => {
          setCidade(response.data);
          setValue("cidade", locale.localidade);
        });
        setValue("rua", locale.logradouro);
        setValue("cep", locale.cep);
        
        setValue("bairro", locale.bairro);
        setValue("uf", locale.uf);
    }
  }, [locale]);

  useEffect(() => {
    setCepLocale(null)
  }, [show]);

  const buscaCep = (cep) => {

    setCepLocale(cep)
    
    if (cep == undefined) return false;
    
    console.log(cep);
    cep = cep.replace(/[^\d]+/g, "");
    console.log(cep);

    if (cep == "") return false;
    if (cep.length != 8) return false;


    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setLocale(response.data);
      })
      .catch((error) => {
        return false;
      });
  };

  const buscaCidade = (uf) => {
    return new Promise((resolve, reject) => {
      axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        setCidade(response.data);
        resolve(response.data)
      });
    });
   
  }

  console.log(cepLocale)
  
  
  function editar({customer_id, customer_name,customer_email,customer_district, customer_address,customer_number, customer_city, customer_state, customer_phone, customer_zip_code}){
    setCustomer(customer_id)
    showModalEditar(true)
    setTimeout(function(){ 
      setValue("nome", customer_name);
      setValue("email", customer_email);
      setValue("telefone", customer_phone);
      setValue("uf", customer_state);
      buscaCidade(customer_state).then((res) => {
        setValue("cidade", customer_city);
      })
      setValue("numero", customer_number);
      setValue("bairro", customer_district);
      setValue("rua", customer_address);
      setValue("cep", customer_zip_code);
      setCepLocale(customer_zip_code)
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
                        Novo cliente
                      </HeadingLine>
                    </div>

                    <div className="-mb-2">
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

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.email && "border-red-500"}
                          label="Email"
                          weight="font-medium"
                          placeholder="Email"
                          name="email"
                          type="text"
                        >
                          {errors.email && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                      
                        <div className="my-3">
                          <label
                            className={`block text-xs font-medium text-gray-600 uppercase`}
                          >
                            CEP
                          </label>

                          <Controller
                            control={control}
                            name="cep"
                            render={({ onChange }) => (
                              <Mask
                                className={`block w-full py-3 px-2 my-1
                                text-sm
                                appearance-none 
                                rounded	
                                border-2 
                                ${errors.cep || "border-gray-200"}
                                focus:outline-none`}
                                placeholder="*****-***"
                                mask="99999-999"
                                value={cepLocale}
                                onChange={(e) => buscaCep(e.target.value)}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:w-1/2 px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.uf && "border-red-500"}
                          label="uf"
                          onChange={(e) => buscaCidade(e.target.value)}
                          placeholder="uf"
                          name="uf"
                        >
                          <option></option>

                          {uf.map(({ sigla }) => (
                            <option>{sigla}</option>
                          ))}
                        </Select>
                        {errors.uf && errors.uf.type === "required" && (
                          <p className="text-xs text-red-500">
                            Este campo é obrigatório
                          </p>
                        )}
                </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.cidade && "border-red-500"}
                          label="Cidade"
                          placeholder="Cidade"
                          name="cidade"
                        >
                          <option></option>

                          {cidade.map(({ nome }) => (
                            <option>{nome}</option>
                          ))}
                        </Select>
                        {errors.cidade && errors.cidade.type === "required" && (
                          <p className="text-xs text-red-500">
                            Este campo é obrigatório
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.bairro && "border-red-500"}
                          label="Bairro"
                          weight="font-medium"
                          placeholder="Bairro"
                          name="bairro"
                          type="text"
                        >
                          {errors.bairro && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.rua && "border-red-500"}
                          label="Rua"
                          weight="font-medium"
                          placeholder="Rua"
                          name="rua"
                          type="text"
                        >
                          {errors.rua && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>

                      <div className="md:w-2/4 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.numero && "border-red-500"}
                          label="Nº"
                          weight="font-medium"
                          placeholder="Nº"
                          name="numero"
                          type="text"
                        >
                          {errors.numero && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <InputMask
                            control={control}
                            label="Telefone"
                            error={(errors.telefone && "border-red-500" )}
                            as={Mask}
                            rules={{ 
                                required: true,
                            }}
                            name="telefone"
                            placeholder="(**) * ****-****" 
                            mask="(99) 9 9999-9999"
                        >
                            {errors.telefone && errors.telefone.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                        </InputMask>
                      </div>
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
                        Editar cliente
                      </HeadingLine>
                    </div>

                    <div className="-mb-2">
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

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.email && "border-red-500"}
                          label="Email"
                          weight="font-medium"
                          placeholder="Email"
                          name="email"
                          type="text"
                        >
                          {errors.email && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                      
                        <div className="my-3">
                          <label
                            className={`block text-xs font-medium text-gray-600 uppercase`}
                          >
                            CEP
                          </label>

                          <Controller
                            control={control}
                            name="cep"
                            render={({ onChange }) => (
                              <Mask
                                className={`block w-full py-3 px-2 my-1
                                text-sm
                                appearance-none 
                                rounded	
                                border-2 
                                ${errors.cep || "border-gray-200"}
                                focus:outline-none`}
                                placeholder="*****-***"
                                mask="99999-999"
                                value={cepLocale}
                                onChange={(e) => buscaCep(e.target.value)}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:w-1/2 px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.uf && "border-red-500"}
                          label="uf"
                          onChange={(e) => buscaCidade(e.target.value)}
                          placeholder="uf"
                          name="uf"
                        >
                          <option></option>

                          {uf.map(({ sigla }) => (
                            <option>{sigla}</option>
                          ))}
                        </Select>
                        {errors.uf && errors.uf.type === "required" && (
                          <p className="text-xs text-red-500">
                            Este campo é obrigatório
                          </p>
                        )}
                </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.cidade && "border-red-500"}
                          label="Cidade"
                          placeholder="Cidade"
                          name="cidade"
                        >
                          <option></option>

                          {cidade.map(({ nome }) => (
                            <option>{nome}</option>
                          ))}
                        </Select>
                        {errors.cidade && errors.cidade.type === "required" && (
                          <p className="text-xs text-red-500">
                            Este campo é obrigatório
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.bairro && "border-red-500"}
                          label="Bairro"
                          weight="font-medium"
                          placeholder="Bairro"
                          name="bairro"
                          type="text"
                        >
                          {errors.bairro && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.rua && "border-red-500"}
                          label="Rua"
                          weight="font-medium"
                          placeholder="Rua"
                          name="rua"
                          type="text"
                        >
                          {errors.rua && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>

                      <div className="md:w-2/4 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.numero && "border-red-500"}
                          label="Nº"
                          weight="font-medium"
                          placeholder="Nº"
                          name="numero"
                          type="text"
                        >
                          {errors.numero && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <InputMask
                            control={control}
                            label="Telefone"
                            error={(errors.telefone && "border-red-500" )}
                            as={Mask}
                            rules={{ 
                                required: true,
                            }}
                            name="telefone"
                            placeholder="(**) * ****-****" 
                            mask="(99) 9 9999-9999"
                        >
                            {errors.telefone && errors.telefone.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                        </InputMask>
                      </div>
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
              {/* <div className="flex flex-col md:flex-row items-center mb-10">
                <Card title="R$ 200,00" subtitle="Acumulado do dia" description="21/05"/>
                <Card color="bg-gradient-to-tr from-green-500 to-green-400" title="R$ 4500,00" subtitle="Acumulado do mês" description="Maio"/>
                <Card color="bg-gradient-to-tr from-yellow-400 to-yellow-500" title="R$ 60.000,00" subtitle="Pendente de recebimento" description="Lucro futuro"/>
                <Card color="bg-gradient-to-tr from-red-600 to-red-400" title="R$ 4.000,00" subtitle="Dividas" description="Dividas a pagar"/>
              </div> */}
              <div className="flex items-center justify-between">
                <HeadingLine
                  color="text-gray-700"
                  size="text-3xl"
                  weight="font-medium"
                  lineColor="border-yellow-400"
                >
                  Clientes
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
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Endereço
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Telefone
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Açõe</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                         {clientes.map((item) => (
                           <tr>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center">
                               <div className="text-sm font-medium text-gray-900">
                                 {item.customer_name}
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-gray-500">
                               {item.customer_email}
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-gray-500">
                              {`${item.customer_district} ${item.customer_address} ${item.customer_number} ${item.customer_city} - ${item.customer_state}`}
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.customer_phone}
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

Clientes.getInitialProps = async (ctx) => {
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