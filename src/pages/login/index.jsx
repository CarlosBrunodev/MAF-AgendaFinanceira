import Input from "../../components/Input";
import Button from "../../components/Button"
import Heading from "../../components/Heading"
import Link from 'next/link'
import {useForm } from "react-hook-form";
import {useState} from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import axios from "axios";
export default function Login({ providers, csrfToken }) {

  const { register, handleSubmit, watch, errors } = useForm();



  const onSubmit = data => {
    axios.post('../api/auth/callback/credentials', data)
    .then(function(response) {
      console.log(response,"jp")
    })
    .catch(function(error) {
      console.log(error,"jorge")
    })
  };

  return (
    <>
    <div className="flex flex-col h-screen lg:bg-blue-500 sm:bg-white ">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
            <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg lg:shadow-lg">
                <Heading size="text-xl" weight="font-semibold">
                <img className="mx-auto w-auto h-24" src="/logo.png"></img>
                </Heading>
                <form autoComplete="off" action="../api/auth/callback/credentials" className="mt-5" method="POST">
                    {/* <Input refs={register({ required: true })} label="Usuario" placeholder="Usuario" name="usuario" type="text">
                      {errors.usuario && <span className="text-sm">Este campo é obrigatorio</span>}
                    </Input> */}

                    <input ref={register()} name='csrfToken' type='hidden' defaultValue={csrfToken}/>

                    <Input refs={register({ required: true })} error={errors.usuario && "border-red-500"} label="Usuario" placeholder="Usuario" name="username" type="text">
                      {errors.username && <span className="text-sm text-red-500">Este campo é obrigatório</span>}
                    </Input>


                    <Input refs={register({ required: true })} error={errors.senha && "border-red-500"} label="Senha" placeholder="Senha" name="password" type="password">
                      {errors.password && <span className="text-sm text-red-500">Este campo é obrigatório</span>}
                    </Input>

                    <Button type="submit" color="bg-yellow-500" hoverColor="bg-yellow-600">Enviar</Button>

                    <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                        <Link href="/forgot-password" className="flex-2 underline">
                            Esqueceu a senha ?
                        </Link>
                        <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                            ou
                        </p>
                        <Link href="/criar-conta" className="flex-2 underline">
                          Criar uma conta
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

Login.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
}
