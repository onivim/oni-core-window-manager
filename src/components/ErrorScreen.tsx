/**
 * Component displaying an error message when there is a failure
 */

import * as React from "react"

export interface ErrorScreenViewProps {
    error: Error
    info: React.ErrorInfo
}

const ErrorScreenStyleProps: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 56, 96, 0.5)",
    color: "white",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}


export class ErrorScreenView extends React.PureComponent<ErrorScreenViewProps> {
    public render(): JSX.Element {
        const errorMessage = this.props.error
            ? this.props.error.toString()
            : "Unable to get error info"

        const additionalStack =
            this.props.info && this.props.info.componentStack
                ? this.props.info.componentStack.toString()
                : "None"

        return (
            <div style={ErrorScreenStyleProps}>
                    <div>We encountered an error:</div>
                    <div>{errorMessage}</div>
            </div>
        )
    }
}
