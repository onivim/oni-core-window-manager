import React from 'react';
import ReactDOM from 'react-dom';

import {WindowManager, WindowSplitsView }from "oni-core-window-manager"

document.getElementById("root").style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: hidden;"

const wm = new WindowManager()
const elem = <WindowSplitsView windowManager={wm} />

    const split1 = wm.createSplit("horizontal", {
        render:() => <div style={{backgroundColor: "red", width: "100%", height: "100%",}}>Hello world</div>
    })

const split2 = wm.createSplit("vertical", {
        render:() => <div style={{backgroundColor: "yellow"}}>Hello world</div>
})

const split3 = wm.createSplit("horizontal", {
        render:() => <div style={{backgroundColor: "blue"}}>Hello world</div>
}, split2)

const sidebar = wm.createSplit("left", {
    render: () => <div style={{backgroundColor: "gray", width: "50px"}} />
})

ReactDOM.render(elem, document.getElementById('root'));
