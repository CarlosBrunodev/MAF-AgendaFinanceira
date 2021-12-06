import Header from "../../components/Header";
import Heading, { HeadingLine } from "../../components/Heading";
import Button, { ButtonIcon } from "../../components/Button";
import moment from "moment";
import { useEffect, useState } from "react";
import AppNav from "../../components/AppNav";
import api from "../../services/api"
import Card from "../../components/Card"
import { getSession } from "next-auth/client";

export default function Dashboard({ session, dashboard, events }) {

  const users = [{ name: "Jorge luiz ", valor: "R$400.00", status: 1, data: "20/05/2021", servico: "Domiciliar" },
  { name: "Jorge luiz ", valor: "R$400.00", status: 2, data: "20/05/2021", servico: "Local" },
  { name: "Carlos Bruno ", valor: "R$240.00", status: 1, data: "20/05/2021", servico: "Domiciliar" },
  { name: "Ana Avelino ", valor: "R$600.00", status: 1, data: "20/05/2021", servico: "Local" },
  { name: "Mayara Uchoa ", valor: "R$150.00", status: 2, data: "20/05/2021", servico: "Domiciliar" },
  { name: "Pablo Fernandes  ", valor: "R$800.00", status: 2, data: "20/05/2021", servico: "Local" },
  { name: "Aurelio Alves ", valor: "R$190.00", status: 1, data: "20/05/2021", servico: "Local" },


]
 




  // Pegar soma de dinheiro por usuario pelo status 2
  // Pegar os agendamentos com status 1
  // Campo de divida ?
  // Status 2 do mes

  return (
    <>
      <AppNav>
        <div className="flex bg-gray-50 overflow-x-hidden h-full">
          <div className="h-full w-full bg-white">
            <div className="flex flex-col p-10">
              <div className="flex items-center justify-between">

              </div>
              <div className="my-5 ">
                <div className="py-2 align-middle inline-block min-w-full">
                  <div className="flex flex-col md:flex-row items-center mb-10">
                    <Card color="bg-gradient-to-tr from-green-600 to-green-500" title={dashboard.acumuladoDia.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )} subtitle="Acumulado do dia" description={moment().format("DD/MM")} />
                    <Card color="bg-gradient-to-tr from-yellow-500 to-yellow-400" title={dashboard.pendente.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )} subtitle="Pendente de recebimento" description="Lucro futuro" />
                    <Card color="bg-gradient-to-tr from-red-600 to-red-500" title={dashboard.divida.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )}  subtitle="Dividas" description="Dividas a pagar" />
                    <Card color="bg-gradient-to-tr from-blue-600 to-blue-500" title={dashboard.acumuladoMes.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )} subtitle="Acumulado do Mes " description={moment().locale('pt-br').format("MMMM").toUpperCase()} />
                  </div>

                  
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-sm">



                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Cliente
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Valor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider justify-items-center"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider justify-items-center"
                          >
                            Serviço
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                          >
                            Data
                          </th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {events.map(item => (
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
                                {item.schedule_value.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )}
                              </div>
                            </td>
                            <td className="px-6 py-4 grid justify-items-center">
                              {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Active
                              </span> */}
                              {item.schedule_status_id == 2 ? (
                                <div className="text-sm text-center text-white rounded-full bg-green-500 py-1 px-3 w-20">
                                  Pago
                                </div>
                              ) : (
                                <div className="text-sm text-white rounded-full bg-yellow-400 py-1 px-3 w-20">
                                  Pendente
                                </div>
                              )}

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.schedule_service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {moment(item.schedule_date_start).format("DD/MM/YYYY")}
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


Dashboard.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getSession({ req });

 
if (session)  {
  const dashboard = await api.post("/dashboard", { user_id: session.user.id })
  const event = await api.post("selectEvent",{user_id : session.user.id})



    return { session: session, dashboard : dashboard.data , events : event.data };
  } else {
    console.log("hmmmm")
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;;
  }
};
