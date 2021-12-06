
import Header from "../../components/Header";
import Heading, { HeadingLine } from "../../components/Heading";
import Footer from "../../components/Footer";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import AppNav from "../../components/AppNav"
import axios from "axios";
import api from "../../services/api"
import {getSession} from "next-auth/client"
export default function Agenda({ session }) {
  
  const [selectedDate, setSelectedDate] = useState(moment());
  const [clientes, setClientes] = useState([]);
  const [eventos, setEventos] = useState([]);


  useEffect(()=> {
    api.post("selectCustomer",{user_id : session.user.id}).then(response => {
      setClientes(response.data)
    })

    api.post("selectEvent",{user_id : session.user.id}).then(response => {
      setEventos(response.data)
    })
    
  },[])

  const EventListItem = ({item}) => {
    if(moment(item.schedule_date_start).isBefore(moment()) && item.schedule_status_id === 1){
    return (
      <div className="flex flex-col mt-5">
      <div  className="text-md font-medium text-gray-700">{moment(item.schedule_date_start).format("DD/MM/YYYY")}</div>
      <div className="flex items-center pt-4">
        <div className="flex items-start flex-col">
          <div className="text-xl font-normal text-blue-700">{moment(item.schedule_date_start).format("HH:mm")}</div>
          <div className="text-sm font-normal text-gray-700">{moment(item.schedule_date_end).format("HH:mm")}</div>
        </div>
        <div className="border-l-4 border-red-400 px-5 mx-5">
          <div className="text-sm uppercase font-normal text-gray-600">{item.customer_name}</div>
          <div className="text-md uppercase font-normal">{item.schedule_service}</div>
          <div className="text-md uppercase font-normal">{item.schedule_value.toLocaleString('pt-BR',{ minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'} )}</div>
        </div>
      </div>
    </div>
    )}else if(item.schedule_status_id === 2){
      return (
        <div className="flex flex-col mt-5">
        <div  className="text-md font-medium text-gray-700">{moment(item.schedule_date_start).format("DD/MM/YYYY")}</div>
        <div className="flex items-center pt-4">
          <div className="flex items-start flex-col">
            <div className="text-xl font-normal text-blue-700">{moment(item.schedule_date_start).format("HH:mm")}</div>
            <div className="text-sm font-normal text-gray-700">{moment(item.schedule_date_end).format("HH:mm")}</div>
          </div>
          <div className="border-l-4 border-green-400 px-5 mx-5">
            <div className="text-sm uppercase font-normal text-gray-600">{item.customer_name}</div>
            <div className="text-md uppercase font-normal">{item.schedule_service}</div>
          </div>
        </div>
      </div>
      )
    }else{
      return (
        <div className="flex flex-col mt-5">
        <div  className="text-md font-medium text-gray-700">{moment(item.schedule_date_start).format("DD/MM/YYYY")}</div>
        <div className="flex items-center pt-4">
          <div className="flex items-start flex-col">
            <div className="text-xl font-normal text-blue-700">{moment(item.schedule_date_start).format("HH:mm")}</div>
            <div className="text-sm font-normal text-gray-700">{moment(item.schedule_date_end).format("HH:mm")}</div>
          </div>
          <div className="border-l-4 border-yellow-400 px-5 mx-5">
            <div className="text-sm uppercase font-normal text-gray-600">{item.customer_name}</div>
            <div className="text-md uppercase font-normal">{item.schedule_service}</div>
          </div>
        </div>
      </div>
      )
    }
  }
  

  return (
    <>
      <AppNav>
            <div className="flex h-full">
            <div className="flex">
            <div className="pl-4 bg-white h-full w-96 flex flex-col">
              <div className="text-xl font-semibold text-blue-700 px-10 py-6">
                Sua Agenda
              </div>
              <div className="flex my-5 px-8 items-center">
                <div className="mx-1 bg-green-500 rounded-full p-1 px-5 text-white">Pago</div>
                <div className="mx-1 bg-yellow-500 rounded-full p-1 px-3 text-white">Proximo</div>
                <div className="mx-1 bg-red-500 rounded-full p-1 px-3 text-white">Atrasados</div>
              </div>

              <div
                className="w-full h-full overflow-auto  bg-white"
                id="journal-scroll">
                <div className="flex flex-col px-10 mt-2">
                    {eventos.map(item => (
                      <EventListItem item={item}/>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <Calendar session={session} clientes={clientes} onInsertEvent={setEventos} eventos={eventos} value={selectedDate} onChange={setSelectedDate} />
        </div>
      </AppNav>
    </>
  );
}

Agenda.getInitialProps = async (ctx) => {
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