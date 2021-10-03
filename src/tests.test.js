import { makeCrewANumber, processData } from "./utils";

describe("SWAPI utils", () => {
  describe("makeCrewANumber", () => {
    it("handles numbers", () => {
      expect(makeCrewANumber(0)).toEqual(0);
      expect(makeCrewANumber(1)).toEqual(1);
      expect(makeCrewANumber(436)).toEqual(436);
    });
    it("handles numbers as strings", () => {
      expect(makeCrewANumber("0")).toEqual(0);
      expect(makeCrewANumber("1")).toEqual(1);
      expect(makeCrewANumber("436")).toEqual(436);
    });
    it("handles numbers as strings with commas", () => {
      expect(makeCrewANumber("1,436")).toEqual(1436);
      expect(makeCrewANumber("0,0")).toEqual(0);
    });
    it("handles ranges of numbers as strings", () => {
      expect(makeCrewANumber("1-11")).toEqual(11);
      expect(makeCrewANumber("0-367")).toEqual(367);
    });
    it("handles unexpected strings", () => {
      expect(makeCrewANumber("unknown")).toEqual("unknown");
      expect(makeCrewANumber("foo")).toEqual("foo");
    });
  });

  describe("processData", () => {
    const mockfilms = {};
    const mockrawData = [
      {
        name: "foo",
        model: "bar",
        crew: 10,
        passengers: 20,
        films: ["film"],
        extraKey: "bananas"
      },
      {
        name: "moo",
        model: "mar",
        crew: 20,
        passengers: 40,
        films: ["differentFilm", "anotherFilm"],
        someOtherExtraKey: "apples"
      }
    ];
    jest.mock("makeCrewANumber", () => jest.fn().mockReturnValue(4));
    //const getFilmDetails = jest.fn().mockReturnValue(["filmDetails"]);
    const expectedMockedResults = {
      count: 2,
      results: [
        {
          name: "foo",
          model: "bar",
          crew: 10,
          crewNumber: 4,
          passengers: 20,
          films: ["filmDetails"],
          films_count: 1
        },
        {
          name: "moo",
          model: "mar",
          crew: 20,
          crewNumber: 4,
          passengers: 40,
          films: ["filmDetails"],
          films_count: 2
        }
      ]
    };/*
    it("processes data correctly", () => {
      expect(processData(mockfilms, mockrawData)).toEqual(
        expectedMockedResults
      );
      expect(makeCrewANumber).toHaveBeenCalledTimes(3);
    });
  });*/
});
