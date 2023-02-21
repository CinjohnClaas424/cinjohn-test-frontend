import { statuses } from "../../src/constants/statuses";
import { checkSlotAvailability } from "../../src/utils/availability-checker";

describe("check availability method", () => {
  test("slot too early", () => {
    var result = checkSlotAvailability(
      8,
      3,
      "2022-12-21",
      [9, 10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("slot too late", () => {
    var result = checkSlotAvailability(
      18,
      3,
      "2022-12-21",
      [9, 10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("slot Full", () => {
    var result = checkSlotAvailability(
      9,
      3,
      "2022-12-21",
      [10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.full);
  });

  test("job length too long", () => {
    var result = checkSlotAvailability(
      9,
      6,
      "2022-12-21",
      [9, 10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("job overruns", () => {
    var result = checkSlotAvailability(
      9,
      3,
      "2022-12-21",
      [9, 10, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("no buffer beforehand", () => {
    var result = checkSlotAvailability(
      10,
      1,
      "2022-12-21",
      [10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("no buffer afterwards", () => {
    var result = checkSlotAvailability(
      10,
      1,
      "2022-12-21",
      [9, 10, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.unavailable);
  });

  test("no data for day", () => {
    var result = checkSlotAvailability(9, 4, "2022-12-21", []);

    expect(result).toEqual(statuses.full);
  });

  test("slot available", () => {
    var result = checkSlotAvailability(
      9,
      5,
      "2022-12-21",
      [9, 10, 11, 12, 13, 14, 15, 16, 17]
    );

    expect(result).toEqual(statuses.available);
  });
});
