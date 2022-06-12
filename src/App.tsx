import React, {useContext, useState} from 'react';
import './App.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {quotes} from "./inspirational_quotes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

enum Screen {
    main, progress, motivation, goals
}

type GlobalState_t = {
    currentScreen: Screen
    setCurrentScreen: (_: Screen) => void
}

const GlobalState = {
    currentScreen: Screen.main,
    setCurrentScreen: (_: Screen) => {  }
} as GlobalState_t

type Dataset = {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
}

type GraphProps = {
    title: string
    labels: string[]
    datasets: Dataset[]
    customCss: string
}

type BtnProps = {
    display: string
    screen: Screen
    sizeCustomCss: string
}

type ClickBtnProps = {
    display: string
    screen: Screen
    sizeCustomCss: string
    onClick: () => void
}

type GoalProps = {
    display: string
    duration: number
}

const globalState = React.createContext(GlobalState)

function getScreenName(screen: Screen) {
    let str: string
    switch (screen) {
        case Screen.main:
            str = ""
            break
        case Screen.progress:
            str = "Your Progress"
            break
        case Screen.motivation:
            str = "Motivation"
            break
        case Screen.goals:
            str = "Your Goals"
            break
    }
    return str
}

function App() {

    const [currentScreen, setCurrentScreen] = useState(Screen.main)

    return (
        <div className="mt-6 ml-6 mr-6 mb-6 new-box-aqua width-full-minus-margin height-full-minus-margin fixed-pos">
            <globalState.Provider value={ { currentScreen, setCurrentScreen } }>
                <div
                    className="text-5xl kanit text-center new-text-aqua mb-4 mt-8 scale-100 transition ease-in-out delay-75 hover:scale-105 duration-300"
                    onClick={ () => {
                        setCurrentScreen(Screen.main)
                    } }
                >
                    HealthBit
                </div>
                <div className="text-2xl kanit text-center new-text-aqua mb-9">
                    { getScreenName(currentScreen) !== "" &&
                        getScreenName(currentScreen)
                    }
                </div>
                { currentScreen === Screen.main &&
                    <MainScreen/>
                }
                { currentScreen === Screen.progress &&
                    <GraphScreen/>
                }
                { currentScreen === Screen.motivation &&
                    <MotivationScreen/>
                }
                { currentScreen === Screen.goals &&
                    <GoalsScreen/>
                }
            </globalState.Provider>
        </div>
    );
}

const Btn = (props: BtnProps) => {

    const global = useContext(globalState)

    return (
        <button
            className={`kanit new-button-amber new-text-amber-dark scale-100 ${props.sizeCustomCss} transition ease-in-out delay-75 hover:scale-105 duration-300`}
            onClick={ () => { global.setCurrentScreen(props.screen) } }>
            {props.display}
        </button>
    );
}

const ClickBtn = (props: ClickBtnProps) => {

    return (
        <button
            className={`kanit new-button-amber new-text-amber-dark scale-100 ${props.sizeCustomCss} transition ease-in-out delay-75 hover:scale-105 duration-300`}
            onClick={props.onClick}>
            { props.display }
        </button>
    );
}

const MotivationScreen = () => {

    const [quoteIdx, setQuoteIdx] = useState(0)

    return (
        <div>
            <div className="kanit new-text-aqua text-center mr-4 ml-4 text-3xl center-tips-screen-tip">
                { quotes[quoteIdx] }
            </div>
            <div className="grid grid-cols-2 gap-x-4 place-items-center place-tips-screen-btns">
                <Btn display="Get Working!" screen={Screen.goals} sizeCustomCss="width-40pc height-6pc text-2xl"></Btn>
                <ClickBtn display="More Motivation!" screen={Screen.motivation} sizeCustomCss="width-40pc height-6pc text-2xl" onClick={ () => { setQuoteIdx((quoteIdx + 1) % quotes.length) } }></ClickBtn>
            </div>
        </div>
    )
}

const Graph = (props:GraphProps) => {
    return (
        <div className={props.customCss}>
            <Line options={ { scales: { y: { beginAtZero: true } }, maintainAspectRatio: false, responsive: true, plugins: { legend: { position: 'top' as const }, title: { display: true, text: props.title } } } } data={ { labels: props.labels, datasets: props.datasets } }></Line>
        </div>
    )
}

const GraphScreen = () => {

    let today = new Date()
    today.setDate(today.getDate() - 3)
    const fourDays:string[] = [];
    for (let i = 0; i < 4; i++) {
        fourDays.push(today.toLocaleDateString('en-US', { weekday: 'long' }))
        today.setDate(today.getDate() + 1)
    }

    return (
        <div className="ml-4 mr-4 grid grid-cols-1 gap-y-4 center-graph-screen-main-div width-75pc">
            <Graph customCss="height-24pc width-75pc" title={"Calories In"} labels={fourDays} datasets={ [ { label: "Calories", data: [ 2000, 200, 2200, 2000 ], borderColor: 'rgb(245 158 11)', backgroundColor: 'rgba(252, 211, 77, 0.4)' }, ] }></Graph>
            <Graph customCss="height-24pc width-75pc" title={"Calories Out"} labels={fourDays} datasets={ [ { label: "Calories", data: [ 1000, 600, 1000, 1100 ], borderColor: 'rgb(245 158 11)', backgroundColor: 'rgba(252, 211, 77, 0.4)' }, ] }></Graph>
        </div>
    );
}

const MainScreen = () => {
    return (
        <div className="grid grid-cols-1 center-main-screen-buttons gap-y-4 width-66pc">
            <Btn display="Goals" screen={Screen.goals} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
            <Btn display="Progress" screen={Screen.progress} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
            <Btn display="Motivation" screen={Screen.motivation} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
            <Btn display="Et cetera" screen={Screen.main} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
        </div>
    );
}

const Goal = (goal:GoalProps) => {

    const date = new Date()
    date.setDate(date.getDate() + goal.duration)

    return (
        <div>
            <div className="text-center text-2xl kanit new-text-aqua">
                { goal.display }
            </div>
            <div className="text-center text-xl kanit new-text-aqua mb-4">
                Until
                { goal.duration === -1 &&
                    ` ∞`
                }
                { goal.duration !== -1 &&
                    ` ${date.toLocaleDateString('en-US')}`
                }
            </div>
        </div>
    )
}

const GoalsScreen = () => {
    return (
        <div className="grid grid-cols-1 center-main-screen-buttons gap-y-4 width-66pc">
            <Goal display={"Stop eating snacks"} duration={-1}></Goal>
            <Goal display={"15 push-ups a day"} duration={5}></Goal>
            <Goal display={"15 sit-ups a day"} duration={5}></Goal>
            <Goal display={"Run half a mile a day"} duration={5}></Goal>
        </div>
    )
}

export default App;
