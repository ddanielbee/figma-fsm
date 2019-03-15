import { FigmaNode } from "../types";
import { simplePrototypeFile, noPrototypeFile, complexPrototypeFile } from "./testData/testData";
import { transformCanvastoFiniteStateMachine } from "./transformCanvasToFiniteStateMachine";

const expectedXstateObject = {
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
};

describe("buildFiniteStateMachine", () => {
  const simplePrototypeCanvas: FigmaNode = simplePrototypeFile.document.children[0];
  const noPrototypeCanvas: FigmaNode = noPrototypeFile.document.children[0];

  it("should extract the name of the file", () => {
    const actual = transformCanvastoFiniteStateMachine(simplePrototypeCanvas);
    expect(actual.id).toBe(expectedXstateObject.id);
  });

  it("should extract the name of the initial prototype frame", () => {
    const actual = transformCanvastoFiniteStateMachine(simplePrototypeCanvas);
    expect(actual.initial).toBe(expectedXstateObject.initial);
  });

  it("should extract the transitions in the prototype to states", () => {
    const actual = transformCanvastoFiniteStateMachine(simplePrototypeCanvas);
    expect(actual.states).toEqual(expectedXstateObject.states);
  });

  it("should build an XState finite state machine object out of a simple Figma Prototype", () => {
    const actual = transformCanvastoFiniteStateMachine(simplePrototypeFile.document.children[0]);
    expect(actual).toEqual(expectedXstateObject);
  });

  it("should build an XState finite state machine object out of a Figma Prototype with multiple events per state", () => {
    const expected = {
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
    };
    const actual = transformCanvastoFiniteStateMachine(complexPrototypeFile.document.children[0]);
    expect(actual).toEqual(expected);
  });

  it("should return null for a Figma Page without a prototype", () => {
    const actual = transformCanvastoFiniteStateMachine(noPrototypeCanvas);
    expect(actual).toBeNull();
  });
});
