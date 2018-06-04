/**
 * Dock.tsx
 *
 * UI that hosts docks on the side/top/bottom of the window.
 */

import * as React from "react"
import { connect } from "react-redux"
import { AutoSizer } from "react-virtualized"

import { WindowSplitHost } from "./WindowSplitHost"

import {
    IAugmentedSplitInfo,
    ISplitInfo,
    layoutFromSplitInfo,
    leftDockSelector,
    WindowManager,
    WindowState,
} from "./../index"

const noop = () => { }

export interface DockProps {
    activeSplitId: string
    splits: IAugmentedSplitInfo[]
}

export class Dock extends React.PureComponent<DockProps, {}> {
    public render(): JSX.Element {
        const docks = this.props.splits.map((s, i) => {
            return (
                <div style={{ display: "flex", flexDirection: "row" }} key={s.id}>
                    <WindowSplitHost
                        key={i}
                        id={s.id}
                        containerClassName="split"
                        split={s}
                        isFocused={this.props.activeSplitId === s.id}
                        onClick={noop}
                    />
                    <div className="split-spacer vertical" />
                </div>
            )
        })

        return <div className="dock container fixed horizontal">{docks}</div>
    }
}

