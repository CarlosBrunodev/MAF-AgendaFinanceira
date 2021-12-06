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
import Card from "../../components/Card";
import { getSession } from "next-auth/client";
import api from "../../services/api";
import Link from "next/link";
import CurrencyInput from "react-currency-input";

export default function ContaPagar({ session }) {
  const { register, handleSubmit, setValue, watch, errors, control } =
    useForm();

  const [show, showModal] = useState(false);
  const [showEditar, showModalEditar] = useState(false);
  const [showPagar, showModalPagar] = useState(false);
  const [contas, contasPagar] = useState([]);
  const [provider, setProvider] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [centroDeCusto, setCentroDeCusto] = useState([]);
  const [status, setStatusNota] = useState([]);
  const [valor, setValor] = useState("0.00");

  const [pay_id, contasPagarId] = useState("");
  const [documento_editar, setDocumento] = useState("");
  const [nf_editar, setNf] = useState("");

  const onSubmit = (data) => {
    var bodyFormData = new FormData();

    const headers = {
      "Content-Type": "application/json",
    };

    data.pay_value = valor.replace(".", "").replace(".", "").replace(",", ".");

    Object.keys(data).map((item) => {
      console.log(data[item]);
      switch (item) {
        case "pay_document":
          bodyFormData.append("document", data[item][0]);
          break;

        case "pay_nf":
          bodyFormData.append("nf", data[item][0]);
          break;

        default:
          break;
      }
    });

    console.log(data);

    bodyFormData.append(
      "data",
      JSON.stringify({ ...data, user_id: session.user.id })
    );

    console.log(valor);

    api.post("/insertContaPagar", bodyFormData, headers).then((response) => {
      alert(response.data.data)
      window.location.reload();
    });
  };

  useEffect(() => {
    api
      .post("/selectContaPagar", { user_id: session.user.id })
      .then((response) => {
        contasPagar(response.data);
      });

    api
      .post("/selectFornecedores", { user_id: session.user.id })
      .then((response) => {
        setProvider(response.data);
      });

    api
      .post("/selectCondPag", { user_id: session.user.id })
      .then((response) => {
        setCategoria(response.data);
      });

    api
      .post("/selectCentroDeCusto", { user_id: session.user.id })
      .then((response) => {
        setCentroDeCusto(response.data);
      });

    api.get("/selectStatus").then((response) => {
      setStatusNota(response.data);
    });
  }, []);

  const onSubmit2 = (data) => {
    var bodyFormData = new FormData();

    const headers = {
      "Content-Type": "application/json",
    };

    Object.keys(data).map((item) => {
      console.log(data[item]);
      switch (item) {
        case "pay_document":
          bodyFormData.append("document", data[item][0]);
          break;

        case "pay_nf":
          bodyFormData.append("nf", data[item][0]);
          break;

        default:
          break;
      }
    });
    console.log(data.pay_value, valor);
    data.pay_value =
      typeof valor != "string"
        ? valor
        : valor.replace(".", "").replace(".", "").replace(",", ".");

    console.log(data);

    bodyFormData.append(
      "data",
      JSON.stringify({
        ...data,
        user_id: session.user.id,
        documento_editar,
        nf_editar,
        pay_id: pay_id,
      })
    );

    api.post("/updateContaPagar", bodyFormData, headers).then((response) => {
      console.log(response.data);
      alert(response.data.data);
      window.location.reload(true);
    });
  };

  useEffect(() => {
    if (!show && !showEditar && !showPagar) {
      setValor("0.00");
    }
  }, [show, showEditar, showPagar]);

  const onSubmit3 = (data) => {
    api
      .post("/realizarContaPagar", {
        ...data,
        user_id: session.user.id,
        pay_id: pay_id,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.data);
        window.location.reload(true);
      });
  };

  function editar({
    pay_id,
    pay_value,
    pay_reference,
    pay_issue_date,
    pay_dt_vencimento,
    pay_provider_id,
    pay_sector_id,
    pay_category_id,
    pay_status_id,
    pay_document,
    pay_nf,
  }) {
    contasPagarId(pay_id);
    showModalEditar(true);
    setValor(pay_value);
    console.log(valor, pay_value, "Esse");
    setTimeout(function () {
      setValue("pay_reference", pay_reference);
      setValue("pay_issue_date", pay_issue_date);
      setValue("pay_dt_vencimento", pay_dt_vencimento);
      setValue("pay_provider_id", pay_provider_id);
      setValue("pay_sector_id", pay_sector_id);
      setValue("pay_category_id", pay_category_id);
      setValue("pay_status_id", pay_status_id);

      setDocumento(pay_document);
      setNf(pay_nf);
    }, 50);
  }

  function pagar({ pay_id }) {
    contasPagarId(pay_id);
    showModalPagar(true);
  }

  return (
    <>
      <AppNav>
        <SideModal isOpen={showPagar} onClose={showModalPagar}>
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            <div className="absolute inset-0 px-4 sm:px-6">
              <div className="h-full " aria-hidden="true">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit3)}
                  method="POST"
                >
                  <div className="p-5 w-full text-left flex flex-col">
                    <div className="flex items-center justify-between">
                      <HeadingLine
                        size="text-lg"
                        color="text-gray-700"
                        weight="thin"
                      >
                        Pagamento
                      </HeadingLine>
                    </div>

                    <div className="-mx-3 mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_dt_pagamento && "border-red-500"}
                          label="Dt Pagamento"
                          weight="font-medium"
                          placeholder="Dt Pagamento"
                          name="pay_dt_pagamento"
                          type="date"
                        >
                          {errors.pay_dt_pagamento && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

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
        </SideModal>

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
                      <HeadingLine
                        size="text-lg"
                        color="text-gray-700"
                        weight="thin"
                      >
                        Novo Conta a Pagar
                      </HeadingLine>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_reference && "border-red-500"}
                          weight="font-medium"
                          label="Referência"
                          placeholder="Referência"
                          name="pay_reference"
                          type="text"
                        >
                          {errors.pay_reference && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-1/2 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_issue_date && "border-red-500"}
                          label="Dt emissão"
                          weight="font-medium"
                          placeholder="Dt emissão"
                          name="pay_issue_date"
                          type="date"
                        >
                          {errors.pay_issue_date && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>

                      <div className="md:w-1/2 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_dt_vencimento && "border-red-500"}
                          label="Dt Vencimento"
                          weight="font-medium"
                          placeholder="Dt Vencimento"
                          name="pay_dt_vencimento"
                          type="date"
                        >
                          {errors.pay_dt_vencimento && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.pay_provider_id && "border-red-500"}
                          label="Fornecedor"
                          placeholder="Fornecedor"
                          name="pay_provider_id"
                        >
                          <option></option>
                          {provider.map(({ provider_id, provider_desc }) => (
                            <option value={provider_id}>{provider_desc}</option>
                          ))}
                        </Select>

                        {provider.length === 0 && (
                          <Link shallow href="/fornecedores">
                            <p className="text-xs cursor-pointer -mt-2 mb-2 text-yellow-500">
                              Cadastre um fornecedor
                            </p>
                          </Link>
                        )}

                        {errors.pay_provider_id &&
                          errors.pay_provider_id.type === "required" && (
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
                          error={errors.pay_sector_id && "border-red-500"}
                          label="Centro de custo"
                          placeholder="Centro de custo"
                          name="pay_sector_id"
                        >
                          <option></option>
                          {centroDeCusto.map(({ sector_id, sector_desc }) => (
                            <option value={sector_id}>{sector_desc}</option>
                          ))}
                        </Select>

                        {centroDeCusto.length === 0 && (
                          <Link shallow href="/centro-de-custo">
                            <p className="text-xs cursor-pointer -mt-2 mb-2 text-yellow-500">
                              Cadastre um centro de custo
                            </p>
                          </Link>
                        )}

                        {errors.pay_sector_id &&
                          errors.pay_sector_id.type === "required" && (
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
                          error={errors.pay_category_id && "border-red-500"}
                          label="Categoria"
                          placeholder="Categoria"
                          name="pay_category_id"
                        >
                          <option></option>
                          {categoria.map(
                            ({ pay_category_id, pay_category_desc }) => (
                              <option value={pay_category_id}>
                                {pay_category_desc}
                              </option>
                            )
                          )}
                        </Select>

                        {centroDeCusto.length === 0 && (
                          <Link shallow href="/categoria-de-pagamento">
                            <p className="text-xs cursor-pointer -mt-2 mb-2 text-yellow-500">
                              Cadastre uma categoria de pagamento
                            </p>
                          </Link>
                        )}

                        {errors.pay_category_id &&
                          errors.pay_category_id.type === "required" && (
                            <p className="text-xs text-red-500">
                              Este campo é obrigatório
                            </p>
                          )}
                      </div>
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
                            name="pay_value"
                            render={({ onChange }) => (
                              <CurrencyInput
                                className={`block w-full py-3 px-2 my-1
                                text-sm
                                appearance-none 
                                rounded	
                                border-2 
                                ${errors.pay_value || "border-gray-200"}
                                focus:outline-none`}
                                decimalSeparator=","
                                value={valor}
                                thousandSeparator="."
                                onChange={(e) => setValor(e)}
                              />
                            )}
                          />
                          {errors.pay_value &&
                            errors.pay_value.type === "required" && (
                              <p className="text-xs text-red-500">
                                Este campo é obrigatório
                              </p>
                            )}
                        </div>
                        {/* <InputMask
                            control={control}
                            label="Valor"
                            error={(errors.pay_value && "border-red-500" )}
                            as={CurrencyInput}
                            rules={{ 
                                required: true,
                            }}
                            name="pay_value"
                           
                        >
                        </InputMask> */}

                        {/* <Input
                          refs={register({ required: true })}
                          error={errors.pay_value && "border-red-500"}
                          weight="font-medium"
                          label="Valor"
                          placeholder="Valor"
                          name="pay_value"
                          type="text"
                        >
                          {errors.pay_value && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input> */}
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.pay_status_id && "border-red-500"}
                          label="Status"
                          placeholder="Status"
                          name="pay_status_id"
                        >
                          <option value="1">Pendente</option>
                          <option value="3">Cancelado</option>
                          <option value="4">Vencido</option>

                          {/* {status.map(({ pay_status_id, pay_status_desc }) => (
                            <option value={pay_status_id}>
                              {pay_status_desc}
                            </option>
                          ))} */}
                        </Select>
                        {errors.pay_status_id &&
                          errors.pay_status_id.type === "required" && (
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
                          error={errors.pay_document && "border-red-500"}
                          weight="font-bold"
                          name="pay_document"
                          label="Documento"
                          type="file"
                        >
                          {errors.pay_document && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_nf && "border-red-500"}
                          weight="font-bold"
                          name="pay_nf"
                          label="NF"
                          type="file"
                        >
                          {errors.pay_nf && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

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
                      <HeadingLine
                        size="text-lg"
                        color="text-gray-700"
                        weight="thin"
                      >
                        Editar Conta a Pagar
                      </HeadingLine>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_reference && "border-red-500"}
                          weight="font-medium"
                          label="Referência"
                          placeholder="Referência"
                          name="pay_reference"
                          type="text"
                        >
                          {errors.pay_reference && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-1/2 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_issue_date && "border-red-500"}
                          label="Dt emissão"
                          weight="font-medium"
                          placeholder="Dt emissão"
                          name="pay_issue_date"
                          type="date"
                        >
                          {errors.pay_issue_date && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>

                      <div className="md:w-1/2 px-3">
                        <Input
                          refs={register({ required: true })}
                          error={errors.pay_dt_vencimento && "border-red-500"}
                          label="Dt Vencimento"
                          weight="font-medium"
                          placeholder="Dt Vencimento"
                          name="pay_dt_vencimento"
                          type="date"
                        >
                          {errors.pay_dt_vencimento && (
                            <span className="text-sm text-red-500">
                              Este campo é obrigatório
                            </span>
                          )}
                        </Input>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.pay_provider_id && "border-red-500"}
                          label="Fornecedor"
                          placeholder="Fornecedor"
                          name="pay_provider_id"
                        >
                          <option></option>
                          {provider.map(({ provider_id, provider_desc }) => (
                            <option value={provider_id}>{provider_desc}</option>
                          ))}
                        </Select>
                        {errors.pay_provider_id &&
                          errors.pay_provider_id.type === "required" && (
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
                          error={errors.pay_sector_id && "border-red-500"}
                          label="Centro de custo"
                          placeholder="Centro de custo"
                          name="pay_sector_id"
                        >
                          <option></option>
                          {centroDeCusto.map(({ sector_id, sector_desc }) => (
                            <option value={sector_id}>{sector_desc}</option>
                          ))}
                        </Select>
                        {errors.pay_sector_id &&
                          errors.pay_sector_id.type === "required" && (
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
                          error={errors.pay_category_id && "border-red-500"}
                          label="Categoria"
                          placeholder="Categoria"
                          name="pay_category_id"
                        >
                          <option></option>
                          {categoria.map(
                            ({ pay_category_id, pay_category_desc }) => (
                              <option value={pay_category_id}>
                                {pay_category_desc}
                              </option>
                            )
                          )}
                        </Select>
                        {errors.pay_category_id &&
                          errors.pay_category_id.type === "required" && (
                            <p className="text-xs text-red-500">
                              Este campo é obrigatório
                            </p>
                          )}
                      </div>
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
                            name="pay_value"
                            render={({ onChange }) => (
                              <CurrencyInput
                                className={`block w-full py-3 px-2 my-1
                                text-sm
                                appearance-none 
                                rounded	
                                border-2 
                                ${errors.pay_value || "border-gray-200"}
                                focus:outline-none`}
                                decimalSeparator=","
                                value={valor}
                                thousandSeparator="."
                                onChange={(e) => setValor(e)}
                              />
                            )}
                          />
                          {errors.pay_value &&
                            errors.pay_value.type === "required" && (
                              <p className="text-xs text-red-500">
                                Este campo é obrigatório
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Select
                          refs={register({
                            required: true,
                          })}
                          error={errors.pay_status_id && "border-red-500"}
                          label="Status"
                          placeholder="Status"
                          name="pay_status_id"
                        >
                          {status.map(({ pay_status_id, pay_status_desc }) => (
                            <option value={pay_status_id}>
                              {pay_status_desc}
                            </option>
                          ))}
                        </Select>
                        {errors.pay_status_id &&
                          errors.pay_status_id.type === "required" && (
                            <p className="text-xs text-red-500">
                              Este campo é obrigatório
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="-mx-3 -mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register()}
                          error={errors.pay_document && "border-red-500"}
                          weight="font-bold"
                          name="pay_document"
                          label="Documento"
                          type="file"
                        ></Input>
                      </div>
                    </div>

                    <div className="-mx-3 mb-3 md:flex">
                      <div className="md:w-full px-3">
                        <Input
                          refs={register()}
                          error={errors.pay_nf && "border-red-500"}
                          weight="font-bold"
                          name="pay_nf"
                          label="NF"
                          type="file"
                        ></Input>
                      </div>
                    </div>

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
                  Contas a pagar
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
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Documento
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Emissão
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Dt Vencimento
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Fornecedor
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Centro de custos
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Categoria
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Valor
                          </th>
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Documento
                          </th>

                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            NF
                          </th>

                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {contas.map((item) => (
                          <tr>
                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.pay_reference}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(item.pay_issue_date).format(
                                    "DD/MM/YYYY"
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(item.pay_dt_vencimento).format(
                                    "DD/MM/YYYY"
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.provider_desc}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.sector_desc}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.pay_category_desc}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.pay_value.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.pay_status_desc}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                  {item.pay_document && (
                                    <Link
                                      href={`${process.env.NEXT_PUBLIC_DOCS}/docs/${item.pay_document}`}
                                      target="_blank"
                                    >
                                      <a target="_blank">Ver Documento</a>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                  {item.pay_nf && (
                                    <Link
                                      href={`${process.env.NEXT_PUBLIC_DOCS}/nf/${item.pay_nf}`}
                                    >
                                      <a target="_blank">Ver NF</a>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {item.pay_status_id != 2 && (
                                <>
                                  <button
                                    onClick={() => editar(item)}
                                    className="mx-1 text-indigo-600 hover:text-indigo-900"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => pagar(item)}
                                    className="mx-1 text-indigo-600 hover:text-indigo-900"
                                  >
                                    Pagar
                                  </button>
                                </>
                              )}
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

ContaPagar.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getSession({ req });

  if (session) {
    return { session: session };
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
};
