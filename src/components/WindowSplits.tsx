/**
 * WindowSplits.tsx
 *
 * UI that hosts all the `Editor` instances
 */

import * as React from "react"
import { connect, Provider } from "react-redux"
import { AutoSizer } from "react-virtualized"

import * as Oni from "oni-api"

import { WindowSplitHost } from "./WindowSplitHost"
import { WindowSplitView } from "./WindowSplitView"

import { WindowManager } from "./../WindowManager"

import {
    IAugmentedSplitInfo,
    ISplitInfo,
    leftDockSelector,
    WindowState,
} from "./../WindowManagerStore"

import { Dock } from "./Dock"

interface RootSplitViewProps extends WindowSplitProps {
    activeSplitId: string
    splitRoot: ISplitInfo<IAugmentedSplitInfo>
    leftDock: IAugmentedSplitInfo[]
}

export interface WindowSplitProps {
    windowManager: WindowManager
}

class RootSplitView extends React.PureComponent<RootSplitViewProps, {}> {
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
                <Dock splits={this.props.leftDock} activeSplitId={this.props.activeSplitId} />
                <WindowSplitView
                    split={this.props.splitRoot}
                    windowManager={this.props.windowManager}
                    activeSplitId={this.props.activeSplitId}
                />
            </div>
        )
    }
}

const mapStateToProps = (
    state: WindowState,
    containerProps: WindowSplitProps,
): RootSplitViewProps => {
    return {
        ...containerProps,
        activeSplitId: state.focusedSplitId,
        leftDock: leftDockSelector(state),
        splitRoot: state.primarySplit,
    }
}

const RootSplits = connect(mapStateToProps)(RootSplitView)

export const WindowSplitsView = (props: WindowSplitProps): JSX.Element => {
    return <Provider store={props.windowManager.store}>
                <RootSplits windowManager={props.windowManager} />
            </Provider>
}
