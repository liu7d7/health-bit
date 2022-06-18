import {Line} from "react-chartjs-2";
import React, {useContext, useState} from "react";
import {ClickBtn} from "./btn";
import {globalState} from "../App";

export enum ProgressScreen {
    calories, sugar
}

export type Dataset = {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
}

export type GraphProps = {
    title: string
    labels: string[]
    datasets: Dataset[]
    customCss: string
}

export const Graph = (props:GraphProps) => {
    return (
        <div className={props.customCss}>
            <Line options={ { scales: { y: { beginAtZero: true } }, maintainAspectRatio: false, responsive: true, plugins: { legend: { position: 'top' as const }, title: { display: true, text: props.title } } } } data={ { labels: props.labels, datasets: props.datasets } }></Line>
        </div>
    )
}

export const GraphScreen = () => {

    let today = new Date()
    today.setDate(today.getDate() - 3)
    const fourDays:string[] = [];
    for (let i = 0; i < 4; i++) {
        fourDays.push(today.toLocaleDateString('en-US', { weekday: 'long' }))
        today.setDate(today.getDate() + 1)
    }
    const global = useContext(globalState)
    const [mode, setMode] = useState(ProgressScreen.sugar)

    return (
        <div>
            <div className="ml-4 mr-4 grid grid-cols-1 center-graph-screen-main-div width-75pc">
                { mode === ProgressScreen.sugar &&
                    <Graph customCss="height-24pc width-75pc" title={"Sugar In"} labels={fourDays} datasets={ [ { label: "Sugar", data: global.profile.sugarIn, borderColor: 'rgb(245 158 11)', backgroundColor: 'rgba(252, 211, 77, 0.4)' }, ] }></Graph>
                }
                { mode === ProgressScreen.calories &&
                    <div>
                        <Graph customCss="height-24pc width-75pc" title={"Calories In"} labels={fourDays} datasets={ [ { label: "Calories", data: global.profile.caloriesIn, borderColor: 'rgb(245 158 11)', backgroundColor: 'rgba(252, 211, 77, 0.4)' }, ] }></Graph>
                        <Graph customCss="height-24pc width-75pc" title={"Calories Out"} labels={fourDays} datasets={ [ { label: "Calories", data: global.profile.caloriesOut, borderColor: 'rgb(245 158 11)', backgroundColor: 'rgba(252, 211, 77, 0.4)' }, ] }></Graph>
                    </div>
                }
            </div>
            <div className="grid grid-cols-1 place-progress-screen-btn place-items-center">
                <ClickBtn display={(mode === ProgressScreen.calories ? "Sugar" : "Calorie") + " Intake"} sizeCustomCss="width-40pc height-6pc text-2xl" onClick={
                    function() {
                        if (mode === ProgressScreen.sugar) {
                            setMode(ProgressScreen.calories)
                        } else {
                            setMode(ProgressScreen.sugar)
                        }
                    }
                }></ClickBtn>
            </div>
        </div>
    );
}