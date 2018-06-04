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
    leftDockSelector,
    WindowManager,
    WindowState,
} from "./../index"

export interface IWindowSplitsProps extends IWindowSplitsContainerProps {
    activeSplitId: string
    splitRoot: ISplitInfo<IAugmentedSplitInfo>
    leftDock: IAugmentedSplitInfo[]
}

export interface IWindowSplitsContainerProps {
    windowManager: WindowManager
}

export interface IWindowSplitViewProps {
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

export class WindowSplitView extends React.PureComponent<IWindowSplitViewProps, {}> {
    public render(): JSX.Element {
        const className = "container horizontal full"

        // TODO: Add drag handles here to allow for resizing!
        return (
            <div className={className}>
                <AutoSizer>
                    {({ height, width }) => {
                        // return <div>{width}{height}</div>
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

export class WindowSplitsView extends React.PureComponent<IWindowSplitsProps, {}> {
    public render() {
        if (!this.props.splitRoot) {
            return null
        }

        const containerStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
        }

        return (
            <div style={containerStyle}>
                <div className="container horizontal full">
                    <Dock splits={this.props.leftDock} activeSplitId={this.props.activeSplitId} />
                    <WindowSplitView
                        split={this.props.splitRoot}
                        windowManager={this.props.windowManager}
                        activeSplitId={this.props.activeSplitId}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (
    state: WindowState,
    containerProps: IWindowSplitsContainerProps,
): IWindowSplitsProps => {
    return {
        ...containerProps,
        activeSplitId: state.focusedSplitId,
        leftDock: leftDockSelector(state),
        splitRoot: state.primarySplit,
    }
}

export const WindowSplits = connect(mapStateToProps)(WindowSplitsView)
