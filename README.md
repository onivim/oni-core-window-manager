# oni-core-window-manager

[![Build Status](https://travis-ci.org/onivim/oni-core-window-manager.svg?branch=master)](https://travis-ci.org/onivim/oni-core-window-manager) 
[![codecov](https://codecov.io/gh/onivim/oni-core-window-manager/branch/master/graph/badge.svg)](https://codecov.io/gh/onivim/oni-core-window-manager)
[![npm version](https://badge.fury.io/js/oni-core-window-manager.svg)](https://badge.fury.io/js/oni-core-window-manager)

React-based window split management, used by Oni.

## Installation

> `yarn add oni-core-window-manager`

## Usage

[Demo]

```
import * as React from "react"
import * as ReactDOM from "react-dom"
import { WindowManager, WindowSplitsView } from "oni-core-window-manager"

const myTestWindow = (message) {
    render: () => <div>{message}</div>
}

const windowManager = new WindowManager()

const split1 = windowManager.createSplit("horizontal", myTestWindow("hello world"))
const split2 = windowManager.createSplit("horizontal", myTestWindow("another split"))
const split3 = windowManager.createSplit("vertical", myTestWindow("split3"))

split3.focus()

windowManager.move("up")

ReactDOM.render(<WindowSplitsView manager={windowManager} />, document.body)
```

## License

This project is licensed under the MIT License. Copyright 2018 Bryan Phelps.
