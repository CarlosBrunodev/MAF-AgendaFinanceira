import { Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import Input, { CurrencyRow, Select } from "../Input";
import { HeadingLine } from "../Heading";
import Button from "../Button";
import CurrencyInput from "react-currency-input";
import { FiSearch, FiRefreshCcw } from "react-icons/fi";
import axios from "axios";
import api from "../../services/api"
import Link from "next/link";

const Dropdown = ({ children, date, onInsertEvent, clientes, eventos, session, style, more }) => {

  const node = useRef();
  const [open, setOpen] = useState(false);

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [fromAmount, setFromAmount] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, watch, errors, control } = useForm();
  const { register : register2, handleSubmit : handleSubmit2, errors : errors2 } = useForm();
  const [valor, setValor] = useState("0.00");

  

  const [pagarEvento, setPagarEvento] = useState([]);



  const handleClickOutside = (e) => {
    console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      console.log("dentro");
      return;
    } else {
      setOpen(false);
    }
  };


  const BRL = (value) =>
    currency(value, { decimal: ",", separator: ".", symbol: "" });

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    console.log(e.target.value);
    console.log(BRL(1234.567).format());
    console.log(BRL(parseFloat(e.target.value)).format());

    setFromAmount(BRL(parseFloat(e.target.value)).format());
  }

  const handleChange = (selectedValue) => {
    setOpen(false);
  };

    
  useEffect(() => {
    setValor("0.00");
  },[open])

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const onSubmit = (data) => {
    data.valor = valor.replace(".","").replace(".","").replace(",",".")

    api.post("/insertEvent",{ ...data, user_id: session.user.id, date:  moment(date).format("YYYY-MM-DD")}).then(response => {
      onInsertEvent(prevState => [...prevState,response.data])
      setOpen(false);
    })
  };

  const onSubmit2 = (data) => {
    console.log(data)
    api.post("/pagarEvent",{eventos: data}).then(response => {
      setOpen(false);
      window.location.reload()
    })
  };

  return (
    <>
      <td className={`${style}`}>
        <div onClick={(e) => setOpen(!open)} className="overflow-hidden">
          {children}
        </div>

        <Transition
          show={open}
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
                      onClick={(e) => setOpen(false)}
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
                    <div className="px-4 sm:px-6">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        {moment(date).format("DD/MM/YYYY")}
                      </h2>
                    </div>

                  
                    <div className="relative flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full "
                          aria-hidden="true"
                        > 

                      
                          <form key={1} autoComplete="off"
                            onSubmit={handleSubmit2(onSubmit2)}
                            method="POST" className="p-5 w-full text-left flex flex-col">
                            {eventos.map(item => (
                                moment(date).isSame(moment(item.schedule_date_start).format('YYYY-MM-DD')) && item.schedule_status_id === 1 && (
                                  <>
                                    <label className="flex my-1 bg-gray-50 rounded-md cursor-pointer px-5 py-6 items-start pl-2 text-sm">
                                    <div className="flex w-full justify-between items-center ">
                                      <div className="flex items-center">
                                      <input onClick={() => setPagarEvento(prevState => [...prevState, item.schedule_id]) } name={item.schedule_id} type="checkbox" className="h-4 w-4" ref={register2()}/>
                                      <div className="ml-2 flex flex-col items-start">
                                        <span className="font-semibold pl-1 uppercase text-gray-700">{item.schedule_service}</span>
                                        <span className="font-normal	pl-1 uppercase text-gray-700">{item.customer_name}</span> 
                                      </div>
                                      </div>
                                      <span className="font-semibold pl-1 uppercase text-gray-700">{moment(item.schedule_date_start).format('HH:mm')} - {moment(item.schedule_date_end).format('HH:mm')}</span>
                                    </div>
                                    </label>
                                  </>
                                )
                            ))}

                            {pagarEvento.length > 0 && (
                               <Button
                               type="submit"
                               color="bg-yellow-500"
                               hoverColor="bg-yellow-600"
                             >
                              Pago
                             </Button>
                            )}

                          </form>

                          <form
                            key={2}
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                            method="POST"
                          >
                            <div className="p-5 w-full text-left flex flex-col">
                              <div className="flex items-center justify-between">
                                <HeadingLine
                                  size="text-md"
                                 weight="font-medium"
                                >
                                  Novo evento
                                </HeadingLine>
                             
                              </div>

                              {/* <div className="flex mt-3">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white mr-1 font-medium flex rounded-sm w-28 h-9 justify-center items-center">
                                  <FiRefreshCcw className="mr-1" size="22" />
                                  Remarcar
                                </button>

                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white mx-1 font-medium flex rounded-sm w-28 h-9 justify-center items-center">
                                  <FiSearch className="mr-1" size="22" />
                                  Ver mais
                                </button>
                              </div> */}

                              <div className="-mb-2">
                                  <Select
                                    refs={register({
                                      required: true,
                                    })}
                                    error={errors.customer_id && "border-red-500"}
                                    label="Nome do Cliente"
                                    weight="font-medium"
                                    placeholder="Cliente"
                                    name="customer_id"
                                  >
                                    <option></option>

                                    {clientes.map(({ customer_id, customer_name }) => (
                                      <option value={customer_id }>{customer_name}</option>
                                    ))}
                                  </Select>

                                  {clientes.length === 0 && (
                                    <Link shallow href="/clientes">
                                      <p className="text-xs cursor-pointer -mt-2 mb-2 text-yellow-500">
                                        Cadastre um clientes
                                      </p>
                                    </Link>
                                
                                  )}

                                  {errors.customer_id && errors.customer_id.type === "required" && (
                                    <Link>
                                      <p className="text-xs text-red-500">
                                        Este campo é obrigatório
                                      </p>
                                    </Link>
                                  )}
                              </div>

                              <div className="-mb-2">
                                <Input
                                  refs={register({ required: true })}
                                  error={errors.service && "border-red-500"}
                                  weight="font-medium"
                                  label="Serviço"
                                  placeholder="Serviço"
                                  name="service"
                                  type="text"
                                >
                                  {errors.service && (
                                    <span className="text-sm text-red-500">
                                      Este campo é obrigatório
                                    </span>
                                  )}
                                </Input>
                              </div>

                              <div className="-mx-3 -mb-3 md:flex">
                                <div className="md:w-full px-3">

                                <div className="my-3">
                          <label
                            className={`block text-xs font-medium text-gray-600 uppercase`}
                          >
                            Valor
                          </label>

                          <Controller
                            control={control}
                            name="valor"
                            render={({ onChange }) => (
                              <CurrencyInput
                                className={`block w-full py-3 px-2 my-1
                                text-sm
                                appearance-none 
                                rounded	
                                border-2 
                                ${errors.valor || "border-gray-200"}
                                focus:outline-none`}
                                decimalSeparator=","
                                value={valor}
                                thousandSeparator="."
                                onChange={(e) => setValor(e)}
                              />
                            )}
                          />
                             {errors.valor && errors.valor.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                        </div>

                                  {/* <Input
                                    refs={register({ required: true })}
                                    error={errors.valor && "border-red-500"}
                                    label="Valor"
                                    weight="font-medium"
                                    placeholder="Valor"
                                    name="valor"
                                    type="text"
                                  >
                                    {errors.valor && (
                                      <span className="text-sm text-red-500">
                                        Este campo é obrigatório
                                      </span>
                                    )}
                                  </Input> */}
                                </div>

                            
                              </div>

                              <div className="-mx-3 mb-1 md:flex">
                              <div className="md:w-1/2 px-3">
                                  <Input
                                    refs={register({ required: true })}
                                    error={errors.inicio && "border-red-500"}
                                   weight="font-medium"
                                    label="Inicio "
                                    placeholder="inicio"
                                    name="inicio"
                                    type="time"
                                  >
                                    {errors.inicio && (
                                      <span className="text-sm text-red-500">
                                        Este campo é obrigatório
                                      </span>
                                    )}
                                  </Input>
                                </div>

                                <div className="md:w-1/2 px-3">
                                  <Input
                                    refs={register({ required: true })}
                                    error={errors.encerramento && "border-red-500"}
                                    weight="font-medium"
                                    label="Encerramento"
                                    placeholder="encerramento"
                                    name="encerramento"
                                    type="time"
                                  >
                                    {errors.encerramento && (
                                      <span className="text-sm text-red-500">
                                        Este campo é obrigatório
                                      </span>
                                    )}
                                  </Input>
                                </div>
                              </div>
                              <label
                                className={`block text-xs text-gray-600 uppercase`}
                              >
                                Endereço do atendimento
                              </label>
                              <div className="-mx-2 my-1 mb-4 - md:flex">
                                <label
                                  for="cliente"
                                  className="flex items-center text-center justify-center cursor-pointer mx-2 rounded-sm py-3 md:w-1/3 text-white bg-yellow-500 hover:bg-yellow-600"
                                >
                                  <input
                                    className="hidden"
                                    type="radio"
                                    id="cliente"
                                    name="endereco"
                                    value={1}
                                    ref={register({ required: true })}
                                    onChange={(e) =>
                                      setSelected(e.target.value)
                                    }
                                  />

                                  <label
                                    title="O atendimento será realizado no endereço do cliente"
                                    className="mt-1"
                                    for="cliente"
                                  >
                                    CLIENTE
                                  </label>
                                </label>
                                <label
                                  for="local"
                                  className="flex items-center justify-center cursor-pointer mx-2 rounded-sm py-3 md:w-1/3  text-white bg-yellow-500 hover:bg-yellow-600"
                                >
                                  <input
                                    className="hidden"
                                    type="radio"
                                    id="local"
                                    name="endereco"
                                    value={2}
                                    ref={register({ required: true })}
                                    onChange={(e) =>
                                      setSelected(e.target.value)
                                    }
                                  />

                                  <label
                                    title="O atendimento será realizado no seu endereço"
                                    className="mt-1"
                                    for="local"
                                  >
                                    LOCAL
                                  </label>
                                </label>

                                <label
                                  for="online"
                                  className="flex items-center justify-center cursor-pointer mx-2 rounded-sm py-3 md:w-1/3 text-white bg-yellow-500 hover:bg-yellow-600"
                                >
                                  <input
                                    className="hidden"
                                    type="radio"
                                    id="online"
                                    name="endereco"
                                    value={3}
                                    ref={register({ required: true })}
                                    onChange={(e) =>
                                      setSelected(e.target.value)
                                    }
                                  />
                                  <label
                                    title="O atendimento será realizado em uma reunião online"
                                    className="mt-1"
                                    for="online"
                                  >
                                    ONLINE
                                  </label>
                                </label>
                              </div>

                              {selected == 1 && (
                                <div className="px-2 mb-4 py-3 bg-gray-200 rounded-sm">
                                  Messejana Fortaleza
                                </div>
                              )}

                              {selected == 2 && (
                                <div className="px-2 mb-4 py-3 bg-gray-200 rounded-sm">
                                  Rua 8 118 alto alegre
                                </div>
                              )}

                              {selected == 3 && (
                                <div className="px-2 mb-4 py-3 bg-gray-200 rounded-sm">
                                  Link
                                </div>
                              )}
                              <Button
                                type="submit"
                                color="bg-yellow-500"
                                hoverColor="bg-yellow-600"
                              >
                                Salvar
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </td>
    </>
  );
};

export default Dropdown;
