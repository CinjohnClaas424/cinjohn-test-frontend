import React from "react";
import "./App.css";
import Slider from "./components/Slider/slider";
import Table from "./components/Table/table";

function App() {
  // #region STATE
  const [joblength, setJoblength] = React.useState<number>(1);
  const [selectedSlot, setSelectedSlot] = React.useState<number | undefined>(
    undefined
  );
  const [date, setDate] = React.useState<string>("");
  // #endregion

  //#region HANDLERS
  const setSelection = (seletedDate: string, timeslot?: number) => {
    setSelectedSlot(timeslot);
    setDate(seletedDate);
  };

  // #endregion

  return (
    <div className="App">
      <div className="w-full max-w-7xl py-10">
        <Slider setJobLength={setJoblength} />
      </div>
      <div className="w-full max-w-7xl overflow-scroll">
        <Table
          joblength={joblength}
          selectedSlot={selectedSlot}
          selectedDate={date}
          setSelectedSlot={setSelection}
        />
      </div>
    </div>
  );
}

export default App;
