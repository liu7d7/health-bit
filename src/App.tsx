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

enum ProgressScreen {
    calories, sugar
}

enum Meal {
    breakfast, lunch, dinner, snacks
}

type GoalProps = {
    name: string
    until: Date
}

type Profile_t = {
    name: string
    goals: GoalProps[]
    sugarIn: number[]
    caloriesIn: number[]
    caloriesOut: number[]
}

type GlobalState_t = {
    currentScreen: Screen
    setCurrentScreen: (_: Screen) => void
    profile: Profile_t
    setProfile: (_: Profile_t) => void
}

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
    sizeCustomCss: string
    onClick: () => void
}

const globalState = React.createContext(null as unknown as GlobalState_t)

function getScreenName(screen: Screen) {
    let str: string
    switch (screen) {
        case Screen.main:
            str = "main"
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

function getMealName(meal: Meal) {
    let str: string
    switch (meal) {
        case Meal.breakfast:
            str = "Breakfast"
            break
        case Meal.lunch:
            str = "Lunch"
            break
        case Meal.dinner:
            str = "Dinner"
            break
        case Meal.snacks:
            str = "Snacks"
            break
    }
    return str
}

function getRandomNumbers(length: number, add: number, mult: number) {
    const a = []
    for (let i = 0; i < length; i++) {
        a.push(Math.random() * mult + add)
    }
    return a
}

function App() {

    const [currentScreen, setCurrentScreen] = useState(Screen.main)
    const [profile, setProfile] = useState({
        name: "John Smith",
        goals: [
            {name: "Stop eating snacks", until: new Date(0)},
            {name: "Do fifteen push ups", until: new Date(0)},
            {name: "Do fifteen sit ups", until: new Date(0)},
            {name: "Do fifteen pull ups", until: new Date(0)},
        ],
        sugarIn: getRandomNumbers(4, 20, 20),
        caloriesIn: getRandomNumbers(4, 700, 1600),
        caloriesOut: getRandomNumbers(4, 700, 1600)
    } as Profile_t)

    return (
        <div className="mt-6 ml-6 mr-6 mb-6 new-box-aqua width-full-minus-margin height-full-minus-margin fixed-pos">
            <globalState.Provider value={ { currentScreen, setCurrentScreen, profile, setProfile } }>
                <div
                    className="text-5xl kanit text-center new-text-aqua mb-4 mt-8 scale-100 transition ease-in-out delay-75 hover:scale-105 duration-300"
                    onClick={ () => {
                        setCurrentScreen(Screen.main)
                    } }
                >
                    BitHealth
                </div>
                <div className="text-2xl kanit text-center new-text-aqua mb-9">
                    { getScreenName(currentScreen) !== "main" &&
                        getScreenName(currentScreen)
                    }
                    { (getScreenName(currentScreen) === "main") &&
                        `Hi, ${profile.name}!`
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
            <div className="grid grid-cols-1 gap-y-4 place-items-center place-tips-screen-btns">
                <Btn display="Get Working!" screen={Screen.goals} sizeCustomCss="width-66pc height-6pc text-2xl"></Btn>
                <ClickBtn display="More Motivation!" sizeCustomCss="width-66pc height-6pc text-2xl" onClick={ () => { setQuoteIdx((quoteIdx + 1) % quotes.length) } }></ClickBtn>
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
                <ClickBtn display={(mode === ProgressScreen.sugar ? "Sugar" : "Calorie") + " Intake"} sizeCustomCss="width-40pc height-6pc text-2xl" onClick={
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

const MainScreen = () => {
    return (
        <div className="grid grid-cols-1 center-main-screen-buttons gap-y-4 width-66pc">
            <Btn display="Goals" screen={Screen.goals} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
            <Btn display="Progress" screen={Screen.progress} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
            <Btn display="Motivation" screen={Screen.motivation} sizeCustomCss="width-66pc height-8pc text-3xl"></Btn>
        </div>
    );
}

const Goal = (goal:GoalProps) => {

    return (
        <div>
            <div className="text-center text-2xl kanit new-text-aqua">
                { goal.name }
            </div>
            <div className="text-center text-xl kanit new-text-aqua">
                Until
                { goal.until.getMilliseconds() === 0 &&
                    ` ∞`
                }
                { goal.until.getMilliseconds() !== 0 &&
                    ` ${goal.until.toLocaleDateString('en-US')}`
                }
            </div>
        </div>
    )
}

const GoalsScreen = () => {

    const global = useContext(globalState)
    const goals = global.profile.goals
    const goalsHTML = []
    for (const goal of goals) {
        goalsHTML.push(<Goal name={goal.name} until={goal.until}></Goal>)
    }

    return (
        <div className="grid grid-cols-1 center-goal-screen-goals gap-y-4 width-66pc">
            {goalsHTML}
        </div>
    )
}

export default App;
