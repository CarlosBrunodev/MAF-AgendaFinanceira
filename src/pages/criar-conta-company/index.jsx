import Input,{InputMask} from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from 'next/link';
import {useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import api from "../../services/api";
import Mask from "react-input-mask";
import { signIn, useSession } from "next-auth/client";
import {validarCnpj} from "../../functions";
import { useRouter } from 'next/router'

export default function Registration({initialProps}) {
    
  const {register, handleSubmit, watch, errors, control } = useForm({});
  const [session, loading] = useSession();
  const router = useRouter()

  const onSubmit = data => {

    api.post("/insertLogin", {...data, tipo : "J"}).then((response) => {
        if (response.data.res) {
            router.push('/login')
        } else {
         alert("Algo deu errado!", response.data.msg, "error");
        }
      }).catch(function(error) {
        console.log(error)
      })
};

  return (
    <>
    <div className="flex flex-col h-screen lg:bg-blue-500 sm:bg-white">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
            <div className="w-11/12 p-2 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-2 sm:px-10 sm:py-6 
                bg-white rounded-lg lg:shadow-lg">
          
                    <div className="text-xs items-center flex justify-between">

                    <Heading size="text-xl" weight="font-semibold">Criar conta</Heading>
                      
                        <Link href="/criar-conta" className="flex-2 underline">
                            Criar uma conta pessoal
                        </Link>

                    </div>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-2" method="POST">
               


                <div className="-mx-3 -mb-2 md:flex">
                    <div className="md:w-1/2 px-3">
                        <Input refs={register({ required: true })} error={errors.razaoSocial && "border-red-500"} label="Razão social" placeholder="Razão social" name="razaoSocial" type="text">
                        {errors.razaoSocial && <p className="text-xs text-red-500 ">Este campo é obrigatório</p>}
                        </Input>
                    </div>
                    <div className="md:w-1/2 px-3">
                        <InputMask
                            control={control}
                            label="Cnjp"
                            error={(errors.cnpj && "border-red-500" )}
                            as={Mask}
                            rules={{ 
                                required: true,
                                validate: async value => {
                                    const resp = await validarCnpj(value)
                                    console.log(resp);
                                    return value.replace(/[^\d]+/g,'') == resp.tax_id;
                                },
                            }}
                            name="cnpj"
                            placeholder="**.***.***/****-**" 
                            mask="99.999.999/9999-99"
                        >
                             {errors.cnpj && errors.cnpj.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                             {errors.cnpj  && errors.cnpj.type === "validate" && <p className="text-xs text-red-500">Cnpj Invalido</p>}
                        </InputMask>
                    </div>
                </div>

                    <Input refs={register({ required: true
                    })} error={errors.email && "border-red-500"} label="Email" placeholder="Email" name="email" type="email">
                      {errors.email && errors.email.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                    </Input>

                    <Input refs={register({ required: true })} error={errors.password && "border-red-500"} label="Senha" placeholder="Senha" name="password" type="password">
                      {errors.password && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                    </Input>

                    <Input refs={register({ required: true })} error={errors.termos && "border-red-500"} name="termos" type="checkbox">
                        <div className="ml-2 w-5/6 font-semibold text-gray-600 text-xs">
                         Declaro que aceito os <Link   target="_blank" href="/termos" className="flex-2 text-gray-200 underline"><b className="flex-2 cursor-pointer text-blue-700 underline">Termos e condições</b></Link> e autorizo o
                         uso de meus dados de acordo com a <Link   target="_blank" href="/termos" className="flex-2 text-gray-200"><b className="flex-2 cursor-pointer text-blue-700 underline">Declaração de privacidade</b></Link>.
                        </div>
                    </Input>
                    {errors.termos && <p className="text-xs text-red-500">Este campo é obrigatório</p>}

                    <br/>

                    <Button color="bg-yellow-500" hoverColor="bg-yellow-600">Enviar</Button>

                    <div className="sm:flex sm:flex-wrap mt-6 sm:mb-2 text-sm text-center">
                        <Link href="/forgot-password" className="flex-2 underline">
                            Esqueceu a senha ?
                        </Link>
                        <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                            ou
                        </p>
                        <Link href="/login" className="flex-2 underline">
                            Já possui conta ?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export async function getServerSideProps() {
    return {
        props: {
            initialProps : []
        }
    }
}