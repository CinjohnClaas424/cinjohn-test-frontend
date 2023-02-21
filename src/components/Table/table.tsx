import React from "react";
import clsx from "clsx";
import { availaibilityData } from "../../data/AvailabilityData";
import moment from "moment";
import messages, { Language } from "../../language/language";
import TableView from "./table-view";
import { useAppLanguage } from "../../hooks/useAppLanguage";
import { fullDaySlots } from "../../constants/fullDaySlots";
import { checkSlotAvailability } from "../../utils/availability-checker";
import { statuses } from "../../constants/statuses";
import "./table-responsive.css";

export default function Table({
  joblength,
  selectedSlot,
  selectedDate,
  setSelectedSlot,
}: {
  joblength: number;
  selectedSlot?: number;
  selectedDate: string;
  setSelectedSlot: (valueDate: string, valueSlot?: number) => void;
}) {
  const language = useAppLanguage();

  const viewMessages = messages[language].availabilityPage;

  const getHeaders = () => {
    const headerArry = [{ name: "Timeslot" }];

    availaibilityData?.forEach((x) => {
      headerArry.push({
        name: moment(x.Date).format("dddd Do"),
      });
    });
    return headerArry;
  };

  const getRows = () => {
    const rowArry: any[] = [];
    fullDaySlots.forEach((slot) => {
      createRow(slot.displayName, slot.beginningTime, rowArry);
    });

    return rowArry;
  };

  const createRow = (
    rowname: string,
    rowStartValue: number,
    rowArry: any[]
  ) => {
    let tempRow = [
      <div
        className={clsx(
          "text-center px-5 py-3 font-bold border-2 border-slate-300"
        )}
      >
        {rowname}
      </div>,
    ];

    availaibilityData?.forEach((x, index) => {
      let additionalStyling = "";

      const cellStatus =
        selectedDate &&
        x.Date === selectedDate &&
        selectedSlot &&
        rowStartValue >= selectedSlot &&
        rowStartValue <= selectedSlot + joblength - 1
          ? statuses.selected
          : checkSlotAvailability(
              rowStartValue,
              joblength,
              x.Date,
              x.HoursAvailable
            );
      switch (cellStatus) {
        case statuses.full:
          additionalStyling = "bg-red-700";
          break;
        case statuses.available:
          additionalStyling = "bg-white";
          break;
        case statuses.selected:
          additionalStyling = "bg-green-500";
          break;
        case statuses.unavailable:
          additionalStyling = "bg-gray-200 font-light italic text-gray-500";
          break;
      }
      tempRow.push(
        <div
          className={clsx(
            "text-center md:px-5 py-3 text-header-text border-2 border-slate-300",
            additionalStyling,
            index >= 5 ? "hideCols-med " : "",
            index >= 3 ? "hideCols-sm " : ""
          )}
          onClick={() => {
            if ([statuses.available, statuses.selected].includes(cellStatus)) {
              if (selectedSlot) {
                setSelectedSlot(x.Date, undefined);
              } else {
                setSelectedSlot(x.Date, rowStartValue);
              }
            }
          }}
        >
          {cellStatus}
        </div>
      );
    });

    rowArry.push(tempRow);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-3">
        <h3 className="font-bold">{viewMessages.title}</h3>
      </div>
      <TableView columns={getHeaders()} rows={getRows()} />
    </div>
  );
}
