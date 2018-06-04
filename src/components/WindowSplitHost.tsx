/**
 * ISplitHost.tsx
 *
 * React component that hosts an IEditor implementation
 */

import * as React from "react"

import * as Oni from "oni-api"

import { ErrorScreenView } from "./ErrorScreen"

export interface IWindowSplitHostProps {
    split: Oni.IWindowSplit
    id: string
    containerClassName: string
    isFocused: boolean
    onClick: (evt: React.MouseEvent<HTMLElement>) => void
}

export interface WindowSplitHostState {
    errorInfo: ErrorInfo
}

export interface ErrorInfo {
    error: Error
    info: React.ErrorInfo
}

const fullVerticalStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
}

/**
 * Component responsible for rendering an individual window split
 */
export class WindowSplitHost extends React.PureComponent<
    IWindowSplitHostProps,
    WindowSplitHostState
> {
    constructor(props: IWindowSplitHostProps) {
        super(props)

        this.state = {
            errorInfo: null,
        }
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo): void {
        this.setState({
            errorInfo: {
                error,
                info,
            },
        })
    }

    public render(): JSX.Element {
        if (this.state.errorInfo) {
            return (
                <div style={fullVerticalStyle}>
                    <ErrorScreenView
                        error={this.state.errorInfo.error}
                        info={this.state.errorInfo.info}
                    />
                </div>
            )
        }

        const className =
            this.props.containerClassName + (this.props.isFocused ? " focus" : " not-focused")
        return (
            <div
                id={this.props.id}
                style={fullVerticalStyle}
                onClick={evt => (!this.props.isFocused ? this.props.onClick(evt) : null)}
            >
                <div className={className}>{this.props.split.render()}</div>
            </div>
        )
    }
}
