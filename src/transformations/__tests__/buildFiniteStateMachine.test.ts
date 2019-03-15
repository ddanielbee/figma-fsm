import { FigmaFile } from "../../types";
import { testFigmaFile } from "../testData/testData";

const buildFiniteStateMachine = (file: FigmaFile) => ({
  id: file.name
});

describe("buildFiniteStateMachine", () => {
  it("should extract the name of the file", () => {
    const expected = {
      id: "prototype-test"
    };
    const actual = buildFiniteStateMachine(testFigmaFile);
    expect(actual).toEqual(expected);
  });
  it.skip("should build an XState finite state machine object out of a Figma Document", () => {
    const expected = {
      id: "prototype-test",
      initial: "iPhone X",
      states: {
        "iPhone X": {
          on: { EVENT: "iPhone X 2" }
        },
        "iPhone X 2": {
          on: { EVENT: "iPhone X" }
        }
      }
    };
    const actual = buildFiniteStateMachine(testFigmaFile);
    expect(actual).toEqual(expected);
  });
});
