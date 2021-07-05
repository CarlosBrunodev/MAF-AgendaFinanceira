import Input,{InputMask} from "../../components/Input";
import Button from "../../components/Button"
import Heading from "../../components/Heading"
import Link from 'next/link'
import Mask from "react-input-mask";
import {signIn, useSession} from "next-auth/client";
import {isValidCPF} from "../../functions"
import {useForm} from "react-hook-form";
import api from "../../services/api"
import { useRouter } from 'next/router'

export default function Registration() {

  const { register, handleSubmit, errors, control } = useForm();
  const [session, loading] = useSession();
  const router = useRouter()

  const onSubmit = data => {

    api.post("/insertLogin", {...data, tipo : "F"}).then((response) => {
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
    <div className="flex flex-col h-screen  lg:bg-blue-500 sm:bg-white">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
            <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg lg:shadow-lg">
                    <div className="text-xs items-center flex justify-between">

                    <Heading size="text-xl" weight="font-semibold">Criar conta</Heading>
                        <Link href="/criar-conta-company" className="flex-2 underline">
                            Criar uma conta empresarial
                        </Link>

                    </div>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="mt-10" method="POST">

                <div className="-mx-3 -mb-2 md:flex">
                    <div className="md:w-1/2 px-3">
                        <Input refs={register({ required: true })} error={errors.nome && "border-red-500"} label="Nome" placeholder="Nome" name="nome" type="text">
                        {errors.nome && <span className="text-sm text-red-500">Este campo é obrigatório</span>}
                        </Input>
                    </div>
                    <div className="md:w-1/2 px-3">

                    <InputMask
                            control={control}
                            label="CPF"
                            error={(errors.cpf && "border-red-500" )}
                            as={Mask}
                            rules={{ 
                                required: true,
                                validate: async value => {
                                    const resp = await isValidCPF(value)
                                    return resp
                                },
                            }}
                            name="cpf"
                            mask="999.999.999-99"
                            placeholder="***.***.***-**"
                        >
                             {errors.cpf && errors.cpf.type === "required" && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                             {errors.cpf  && errors.cpf.type === "validate" && <p className="text-xs text-red-500">Cpf Invalido</p>}
                        </InputMask>

                    </div>
                </div>

                    <Input refs={register({ required: true})} error={errors.email && "border-red-500"} label="Email" placeholder="Email" name="email" type="email">
                        {errors.email && errors.email.type === "required" && <span className="text-sm text-red-500">Este campo é obrigatório</span>}
                    </Input>

                    <Input refs={register({ required: true })} error={errors.senha && "border-red-500"} label="Senha" placeholder="Senha" name="password" type="password">
                      {errors.password && <span className="text-sm text-red-500">Este campo é obrigatório</span>}
                    </Input>

                    <Input refs={register({ required: true })} error={errors.termos && "border-red-500"} name="termos" type="checkbox">
                        <div className="ml-2 w-5/6 font-semibold text-gray-600 text-xs">
                         Declaro que aceito os <Link   target="_blank" href="/termos" className="flex-2 text-gray-200 underline"><b className="flex-2 cursor-pointer text-blue-700 underline"><a target="_blank" >Termos e condições</a></b></Link> e autorizo o
                         uso de meus dados de acordo com a <Link   target="_blank" href="/termos" className="flex-2 text-gray-200"><b className="flex-2 cursor-pointer text-blue-700 underline"><a target="_blank" >Declaração de privacidade</a></b></Link>.
                        </div>
                    </Input>
                    {errors.termos && <p className="text-xs text-red-500">Este campo é obrigatório</p>}
                    <br/>
                    <Button type="submit" color="bg-yellow-500" hoverColor="bg-yellow-600">Enviar</Button>

                    <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
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

