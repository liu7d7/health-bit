import React, {useContext} from "react";
import {globalState, Screen} from "../App";


export type BtnProps = {
    display: string
    screen: Screen
    sizeCustomCss: string
}

export type ClickBtnProps = {
    display: string
    sizeCustomCss: string
    onClick: () => void
}

export const Btn = (props: BtnProps) => {

    const global = useContext(globalState)

    return (
        <button
            className={`kanit new-button-amber new-text-amber-dark scale-100 ${props.sizeCustomCss} transition ease-in-out delay-75 hover:scale-105 duration-300`}
            onClick={ () => { global.setCurrentScreen(props.screen) } }>
            {props.display}
        </button>
    );
}

export const ClickBtn = (props: ClickBtnProps) => {

    return (
        <button
            className={`kanit new-button-amber new-text-amber-dark scale-100 ${props.sizeCustomCss} transition ease-in-out delay-75 hover:scale-105 duration-300`}
            onClick={props.onClick}>
            { props.display }
        </button>
    );
}