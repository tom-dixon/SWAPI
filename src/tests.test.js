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
});
