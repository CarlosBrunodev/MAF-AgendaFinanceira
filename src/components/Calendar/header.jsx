import React from "react";
import moment from "moment"
import { FiChevronLeft, FiChevronRight} from "react-icons/fi";

export default function CalendarHeader({ value, onChange }) {
  function currMonthName() {
    return moment(value).locale('pt-br').format("MMMM").toUpperCase();
  }

  function currYear() {
    return moment(value).locale('pt-br').format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (
    <div className="flex w-full h-1/6 items-center justify-between  px-5">
      <div
        className="cursor-pointer"
        onClick={() => onChange(prevMonth())}
      >
        <FiChevronLeft size="34"/> 
      </div>
      <div className="text-3xl font-medium text-blue-600 ">
        {currMonthName()} {currYear()}
      </div>
      <div className="cursor-pointer" onClick={() => onChange(nextMonth())}>
        <FiChevronRight size="34"/>
      </div>
    </div>
  );
}
