import {
  simplePrototypeFile,
  multiplePrototypeFile,
  blankPrototypeFile
} from "./testData/testData";
import { transformFileToFiniteStateMachines } from "./transformFileToFiniteStateMachines";

describe("transformFileToFiniteStateMachines", () => {
  it("should transform a file with one prototype page into an array with one finite state machine object", () => {
    const expected = [
      {
        id: "Page 1",
        initial: "iPhone X",
        states: {
          "iPhone X": {
            on: { EVENT1: "iPhone X 2" }
          },
          "iPhone X 2": {
            on: { EVENT1: "iPhone X" }
          }
        }
      }
    ];
    const actual = transformFileToFiniteStateMachines(simplePrototypeFile);
    expect(actual).toEqual(expected);
  });

  it("should transform a file with multiple prototype pages into an array with multiple finite state machine objects", () => {
    const expected = [
      {
        id: "Page 1",
        initial: "iPhone X",
        states: {
          "iPhone X": {
            on: { EVENT1: "iPhone X 2" }
          },
          "iPhone X 2": {
            on: { EVENT1: "iPhone X", EVENT2: "iPhone X 3" }
          },
          "iPhone X 3": {
            on: { EVENT1: "iPhone X" }
          }
        }
      },
      {
        id: "Page 2",
        initial: "iPhone X",
        states: {
          "iPhone X": {
            on: { EVENT1: "iPhone X 2" }
          },
          "iPhone X 2": {
            on: { EVENT1: "iPhone X" }
          }
        }
      }
    ];

    const actual = transformFileToFiniteStateMachines(multiplePrototypeFile);
    expect(actual).toEqual(expected);
  });

  it("should filter out pages without prototypes", () => {
    const expected = [
      {
        id: "Page 1",
        initial: "iPhone X",
        states: {
          "iPhone X": {
            on: { EVENT1: "iPhone X 2" }
          },
          "iPhone X 2": {
            on: { EVENT1: "iPhone X", EVENT2: "iPhone X 3" }
          },
          "iPhone X 3": {
            on: { EVENT1: "iPhone X" }
          }
        }
      },
      {
        id: "Page 2",
        initial: "iPhone X",
        states: {
          "iPhone X": {
            on: { EVENT1: "iPhone X 2" }
          },
          "iPhone X 2": {
            on: { EVENT1: "iPhone X" }
          }
        }
      }
    ];

    const actual = transformFileToFiniteStateMachines(blankPrototypeFile);
    expect(actual).toEqual(expected);
  });
});
