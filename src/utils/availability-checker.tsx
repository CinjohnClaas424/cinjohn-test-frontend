import moment from "moment";
import { statuses } from "../constants/statuses";

export const checkSlotAvailability = (
  time: number,
  jobLength: number,
  date: string,
  availability: number[]
) => {
  let status = statuses.unavailable;
  const earliestSlot = 9;
  const latestSlot = 17;
  const dateToUse = moment(date);
  const today = moment().toDate();

  if (
    time < earliestSlot ||
    time > latestSlot ||
    jobLength > 5 ||
    jobLength < 1 ||
    !dateToUse.isSameOrAfter(today, "hour")
  ) {
    console.log(
      `time ${time}, jobLength ${jobLength},   !dateToUse.isSameOrAfter(today) ${!dateToUse.isSameOrAfter(
        today
      )}`
    );
    status = statuses.unavailable;
  } else {
    if (availability.find((x) => x === time)) {
      let needsBeforeBuffer = true;
      let needsAfterBuffer = true;
      let sameDayBuffer = false;
      let timeAvailable = true;

      switch (time) {
        case earliestSlot:
          needsBeforeBuffer = false;
          break;
        case latestSlot:
          needsAfterBuffer = false;
          break;
      }

      if (dateToUse.isSame(today, "day")) sameDayBuffer = true;

      let startTime = time;

      if (needsBeforeBuffer) {
        startTime = time - 1;
      }

      if (needsAfterBuffer) {
        jobLength = jobLength + 1;
      }

      if (sameDayBuffer) {
        startTime = time - 2;
      }

      timeAvailable = checkTimeAvailability(startTime, jobLength, availability);

      if (timeAvailable) status = statuses.available;
      else status = statuses.unavailable;
    } else {
      status = statuses.full;
    }
  }
  return status;
};

const checkTimeAvailability = (
  time: number,
  joblength: number,
  availability: number[]
) => {
  for (let i = time; i <= time + joblength; i++) {
    if (!availability.find((x) => x === i)) return false;
  }

  return true;
};
