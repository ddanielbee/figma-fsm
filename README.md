# figma-fsm

Convert Figma Prototype files to [Xstate](https://github.com/davidkpiano/xstate) compatible Finite State Machine objects. It uses the [Figma](https://www.figma.com/developers/docs) REST api to retrieve a file and transforms it into a Finite State Machine that can be [visualized here](https://statecharts.github.io/xstate-viz/)

## Installation

The best way is to use [npm](https://www.npmjs.com/)

`npm install figma-fsm`

## Usage

### In Node

```
const figmaFSM = require("figma-fsm")

figmaFSM(<FigmaToken>, <FigmaFileKey>).then(result => // Do something with your result).

```

### In Typescript

```
import figmaFSM from "figma-fsm";

figmaFSM(<FigmaToken>, <FigmaFileKey>).then(result => // Do something with your result).
```

### Getting a Figma Token

The best way is to create one following the instructions in the [Figma API Docs](https://www.figma.com/developers/docs#authentication).

## Next Steps

- Build a CLI tool.
- Build a UI that connects to the visualizer directly.
