import React from 'react';
import ReactDOM from 'react-dom';

import {WindowManager, WindowSplitView }from "oni-core-window-manager"

const wm = new WindowManager()

ReactDOM.render(<WindowSplitView windowManager={wm} />, document.getElementById('root'));
