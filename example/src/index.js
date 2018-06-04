import React from 'react';
import ReactDOM from 'react-dom';

import {WindowManager, WindowSplitsView }from "oni-core-window-manager"

document.getElementById("root").style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: hidden;"

const backgroundColor = "#212733"
const splitBackgroundColor = "#2F3440"
const splitForegroundColor = "#DCDCDC"

document.body.style.backgroundColor = backgroundColor

const createWindowSplitObject = (text, closeFunc) => {

    const render = () => {
        return <div style={{backgroundColor: splitBackgroundColor, color: splitForegroundColor, height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div>{text}</div>
            <a onClick={closeFunc}>close</a>
            </div>
    }

    return {
        render
    }
}

const wm = new WindowManager()
const elem = <WindowSplitsView windowManager={wm} />
let splitIndex = 0

const addSplit = (verticalOrHorizontal) => {

    let handle = null

    const close = () => {
        if (handle) {
            handle.close()
        }
    }

    splitIndex++
    handle = wm.createSplit(verticalOrHorizontal, createWindowSplitObject("Split" + splitIndex.toString(), close))
}

const addHorizontalSplit = () => addSplit("horizontal")
const addVerticalSplit = () => addSplit("vertical")

addHorizontalSplit()

const Button = (props) => <button onClick={props.onClick}>{props.children}</button>

const Host = <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                    {elem}
                    <div style={{flex: "0 0 auto", height: "50px"}}>
                        <Button onClick={() => addVerticalSplit()}>add vertical split</Button>
                        <Button onClick={() => addHorizontalSplit()}>add horizontal split</Button>
                    </div>
                  </div>

ReactDOM.render(Host, document.getElementById('root'));
