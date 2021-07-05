import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import Dropdown from "../Dropdown";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { HeadingLine } from "../Heading";
import Button from "../Button";

export default function Calendar({
  value,
  onChange,
  onInsertEvent,
  clientes,
  eventos,
  session,
}) {
  const [calendar, setCalendar] = useState([]);
  const { register, handleSubmit, watch, errors, control } = useForm();

  console.log(eventos);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function buildCalendar(date) {
    const a = [];

    const startDay = date.clone().startOf("month").startOf("week");
    const endDay = date.clone().endOf("month").endOf("week");

    const _date = startDay.clone().subtract(1, "day");

    while (_date.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => _date.add(1, "day").clone())
      );
    }
    return a;
  }

  function thisMonth(day) {
    return moment(day).format("MM") === moment().format("MM");
  }
  function otherMonth(day) {
    return moment(day).format("MM") !== moment().format("MM");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day, di) {
    if (isToday(day))
      return (
        <Dropdown
          session={session}
          style="border-t-4 border-blue-600  bg-gray-50 font-semibold px-2  overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-200"
          date={day}
          clientes={clientes}
          eventos={eventos}
          onInsertEvent={onInsertEvent}
        >

        <div className="flex flex-col h-20 mx-auto overflow-hidden">
         
          <div className="text-left	ml-2 mb-3 h-5 w-full">
            <span className="text-lg text-blue-500">
              {moment(day).format("D")}
            </span>
          </div>

          <div className="bottom py-1 flex-grow w-20 text-left cursor-pointer">
            {eventos.map((item) => (
              <>
                {moment(day).isSame(
                  moment(item.schedule_date_start).format("YYYY-MM-DD")
                ) &&
                  item.schedule_status_id === 1 && (
                    <>
                      <div className="flex items-start pl-2 text-sm">
                        {moment(item.schedule_date_start).isBefore(moment()) ? (
                          <span className="text-red-400 mt-1.5">
                            <svg width="10" height="10">
                              <circle
                                cx="5"
                                cy="5"
                                r="5"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>
                        ) : (
                          <span className="text-yellow-400 mt-1.5">
                            <svg width="10" height="10">
                              <circle
                                cx="5"
                                cy="5"
                                r="5"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>
                        )}

                        <span className="font-semibold pl-1 text-gray-700">
                          {item.schedule_service}
                        </span>
                      </div>
                    </>
                  )}

                {moment(day).isSame(
                  moment(item.schedule_date_start).format("YYYY-MM-DD")
                ) &&
                  item.schedule_status_id === 2 && (
                    <>
                      <div className="flex items-start pl-2 text-sm">
                        <span className="text-green-400 mt-1.5">
                          <svg width="10" height="10">
                            <circle
                              cx="5"
                              cy="5"
                              r="5"
                              fill="currentColor"
                            ></circle>
                          </svg>
                        </span>
                        <span className="font-semibold pl-1 text-gray-700">
                          {item.schedule_service}
                        </span>
                      </div>
                    </>
                  )}
              </>
            ))}
          </div>
          </div>

        </Dropdown>
      );

    if (thisMonth(day))
      return (
        <Dropdown
          session={session}
          style="overflow-auto transition cursor-pointer px-2 duration-500 ease hover:bg-gray-200"
          date={day}
          onInsertEvent={onInsertEvent}
          clientes={clientes}
          eventos={eventos}
        >
          <div className="flex flex-col h-20 mx-auto overflow-hidden">
            <div className="text-left	ml-2 h-5 w-full">
              <span className="text-gray-500 text-lg">
                {moment(day).format("D")}
              </span>
            </div>
            <div className="bottom flex-grow  py-1 w-full cursor-pointer">
              {eventos.map((item) => (
                <>
                  {moment(day).isSame(
                    moment(item.schedule_date_start).format("YYYY-MM-DD")
                  ) &&
                    item.schedule_status_id === 1 && (
                      <>
                        <div className="flex items-start pl-2 text-sm">
                          {moment(item.schedule_date_start).isBefore(
                            moment()
                          ) ? (
                            <span className="text-red-400 mt-1.5">
                              <svg width="10" height="10">
                                <circle
                                  cx="5"
                                  cy="5"
                                  r="5"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </span>
                          ) : (
                            <span className="text-yellow-400 mt-1.5">
                              <svg width="10" height="10">
                                <circle
                                  cx="5"
                                  cy="5"
                                  r="5"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </span>
                          )}
                          <span className="font-semibold pl-1 text-gray-700">
                            {item.schedule_service}
                          </span>
                        </div>
                      </>
                    )}

                  {moment(day).isSame(
                    moment(item.schedule_date_start).format("YYYY-MM-DD")
                  ) &&
                    item.schedule_status_id === 2 && (
                      <>
                        <div className="flex items-start pl-2 text-sm">
                          <span className="text-green-400 mt-1.5">
                            <svg width="10" height="10">
                              <circle
                                cx="5"
                                cy="5"
                                r="5"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>
                          <span className="font-semibold pl-1 text-gray-700">
                            {item.schedule_service}
                          </span>
                        </div>
                      </>
                    )}
                </>
              ))}
            </div>
          </div>
        </Dropdown>
      );

    if (otherMonth(day))
      return (
        <Dropdown
          session={session}
          style="bg-gray-100 px-2 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
          date={day}
          onInsertEvent={onInsertEvent}
          clientes={clientes}
          eventos={eventos}
        >
          <div className="flex flex-col h-20 mx-auto overflow-hidden">
            <div className="text-left	ml-2 h-5 w-full">
              <span className="text-gray-500 text-lg">
                {moment(day).format("D")}
              </span>
            </div>
            <div className="bottom flex-grow  py-1 w-full cursor-pointer">
              {eventos.map((item) => (
                <>
                  {moment(day).isSame(
                    moment(item.schedule_date_start).format("YYYY-MM-DD")
                  ) &&
                    item.schedule_status_id === 1 && (
                      <>
                        <div className="flex items-start pl-2 text-sm">
                          {moment(item.schedule_date_start).isBefore(
                            moment()
                          ) ? (
                            <span className="text-red-400 mt-1.5">
                              <svg width="10" height="10">
                                <circle
                                  cx="5"
                                  cy="5"
                                  r="5"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </span>
                          ) : (
                            <span className="text-yellow-400 mt-1.5">
                              <svg width="10" height="10">
                                <circle
                                  cx="5"
                                  cy="5"
                                  r="5"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </span>
                          )}
                          <span className="font-semibold pl-1 text-gray-700">
                            {item.schedule_service}
                          </span>
                        </div>
                      </>
                    )}

                  {moment(day).isSame(
                    moment(item.schedule_date_start).format("YYYY-MM-DD")
                  ) &&
                    item.schedule_status_id === 2 && (
                      <>
                        <div className="flex items-start pl-2 text-sm">
                          <span className="text-green-400 mt-1.5">
                            <svg width="10" height="10">
                              <circle
                                cx="5"
                                cy="5"
                                r="5"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>
                          <span className="font-semibold pl-1 text-gray-700">
                            {item.schedule_service}
                          </span>
                        </div>
                      </>
                    )}
                </>
              ))}
            </div>
          </div>
        </Dropdown>
      );
  }

  console.log(calendar);

  return (
    <div className="container flex flex-grow  flex-row mx-auto px-4 sm:flex-row">
      <div className="wrapper bg-white rounded shadow w-full ">
        <Header value={value} onChange={onChange} />
        <table className="w-full h-5/6">
          <thead>
            <tr>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Domingo
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Don
                </span>
              </th>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Segunda
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Seg
                </span>
              </th>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Terça
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Ter
                </span>
              </th>
              <th className="p-2  h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Quarta
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Qua
                </span>
              </th>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Quinta
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Qui
                </span>
              </th>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Sexta
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sex
                </span>
              </th>
              <th className="p-2 h-10 w-56  xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Sabado
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sab
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="box-wrap">
            {calendar.map((week, wi) => (
              <tr className="text-center h-1/6 py-5" key={wi}>
                {week.map((day, di) => dayStyles(day, di))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
