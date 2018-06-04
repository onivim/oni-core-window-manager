/**
 * WindowSplits.tsx
 *
 * UI that hosts all the `Editor` instances
 */

import * as React from "react"
import { connect } from "react-redux"
import { AutoSizer } from "react-virtualized"

import * as Oni from "oni-api"

import { WindowSplitHost } from "./WindowSplitHost"

import {
    IAugmentedSplitInfo,
    ISplitInfo,
    layoutFromSplitInfo,
    WindowManager,
} from "./../index"

export interface WindowSplitViewProps {
    activeSplitId: string
    split: ISplitInfo<IAugmentedSplitInfo>
    windowManager: WindowManager
}

const px = (num: number): string => num.toString() + "px"

const rectangleToStyleProperties = (
    rect: Oni.Shapes.Rectangle,
    totalHeight: number,
): React.CSSProperties => {
    const halfPadding = 3
    const topPosition = rect.y === 0 ? 0 : Math.ceil(rect.y) + halfPadding

    const bottomPadding = Math.ceil(rect.y + rect.height) >= totalHeight ? 0 : halfPadding * 2
    return {
        position: "absolute",
        top: px(topPosition),
        left: px(Math.ceil(rect.x) + halfPadding),
        width: px(Math.floor(rect.width) - halfPadding * 2),
        height: px(Math.floor(rect.height) - bottomPadding),
    }
}

const windowSplitViewStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    flex: "1 1 auto",

    display: "flex",
    flexDirection: "row",
}

export class WindowSplitView extends React.PureComponent<WindowSplitViewProps, {}> {
    public render(): JSX.Element {
        const className = "container horizontal full"

        // TODO: Add drag handles here to allow for resizing!
        return (
            <div style={windowSplitViewStyle}>
                <AutoSizer>
                    {({ height, width }) => {
                        const items = layoutFromSplitInfo(this.props.split, width, height)
                        const vals: JSX.Element[] = Object.values(items).map(item => {
                            const style = rectangleToStyleProperties(item.rectangle, height)
                            return (
                                <div style={style}>
                                    <WindowSplitHost
                                        key={item.split.id}
                                        id={item.split.id}
                                        containerClassName="editor"
                                        split={item.split}
                                        isFocused={this.props.activeSplitId === item.split.id}
                                        onClick={() => {
                                            this.props.windowManager.focusSplit(item.split.id)
                                        }}
                                    />
                                </div>
                            )
                        })
                        return <div style={{ position: "relative" }}>{vals}</div>
                    }}
                </AutoSizer>
            </div>
        )
    }
}
