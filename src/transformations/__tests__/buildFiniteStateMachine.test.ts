import { FigmaNode, FigmaCanvas } from "../../types";
import { testFigmaFile } from "../testData/testData";

const buildFiniteStateMachine = (canvas: FigmaNode) => {
  const initial = canvas.children.find(node => node.id === canvas.prototypeStartNodeID).name;
  const states = canvas.children
    .filter(children =>
      children.children.some(childNode => childNode.transitionNodeID !== undefined)
    )
    .reduce((acc, cur) => {
      const temp = {};
      temp[cur.name] = {
        on: {
          EVENT: canvas.children.find(
            canvasChild =>
              canvasChild.id ===
              cur.children.find(child => child.transitionNodeID !== undefined).transitionNodeID
          ).name
        }
      };
      return { ...acc, ...temp };
    }, {});
  return { id: canvas.name, initial, states };
};

const expectedXstateObject = {
  id: "Page 1",
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

describe("buildFiniteStateMachine", () => {
  const prototypeCanvas: FigmaNode = testFigmaFile.document.children[0];

  it("should extract the name of the file", () => {
    const actual = buildFiniteStateMachine(prototypeCanvas);
    expect(actual.id).toBe(expectedXstateObject.id);
  });

  it("should extract the name of the initial prototype frame", () => {
    const actual = buildFiniteStateMachine(prototypeCanvas);
    expect(actual.initial).toBe(expectedXstateObject.initial);
  });

  it("should extract the transitions in the prototype to states", () => {
    const actual = buildFiniteStateMachine(prototypeCanvas);
    expect(actual.states).toEqual(expectedXstateObject.states);
  });

  it.skip("should build an XState finite state machine object out of a Figma Document", () => {
    const expected = {
      id: "Page 1",
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
    const actual = buildFiniteStateMachine(testFigmaFile.document.children[0]);
    expect(actual).toEqual(expected);
  });
});
