import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => {
    return (
        <h1>Hell11o from {props.compiler} and {props.framework}!</h1>
    )
}