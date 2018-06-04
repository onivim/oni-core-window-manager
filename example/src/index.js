import React from 'react';
import ReactDOM from 'react-dom';

import {WindowManager, WindowSplitsView }from "oni-core-window-manager"

document.getElementById("root").style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: hidden;"

const backgroundColor = "#212733"
const splitBackgroundColor = "#2F3440"
const splitForegroundColor = "#DCDCDC"

document.body.style.backgroundColor = backgroundColor

const createWindowSplitObject = (text) => {

    const render = () => {
        return <div style={{backgroundColor: splitBackgroundColor, color: splitForegroundColor, height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>{text}</div>
    }

    return {
        render
    }
}

const wm = new WindowManager()
const elem = <WindowSplitsView windowManager={wm} />

const split1 = wm.createSplit("horizontal", createWindowSplitObject("test1"))
const split2 = wm.createSplit("vertical", createWindowSplitObject("test2"))
const split3 = wm.createSplit("horizontal", createWindowSplitObject("test3"), split2) 

ReactDOM.render(elem, document.getElementById('root'));
