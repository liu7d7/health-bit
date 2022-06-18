import React, {useState} from 'react';
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
import {MotivationScreen} from "./app/motivation";
import {Btn} from "./app/btn";
import {GraphScreen} from "./app/graph";
import {DeleteGoalScreen, GoalProps, GoalsScreen} from "./app/goal";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export enum Screen {
    main, progress, motivation, goals
}

enum Meal {
    breakfast, lunch, dinner, snacks
}

export type Profile_t = {
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
    deletingGoal: string
    setDeletingGoal: (_:string) => void
}

export const globalState = React.createContext(null as unknown as GlobalState_t)

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
        goals: [],
        sugarIn: getRandomNumbers(4, 20, 20),
        caloriesIn: getRandomNumbers(4, 1600, 700),
        caloriesOut: getRandomNumbers(4, 1600, 700)
    } as Profile_t)
    const [deletingGoal, setDeletingGoal] = useState("")

    return (
        <div className="mt-6 ml-6 mr-6 mb-6 new-box-aqua width-full-minus-margin height-full-minus-margin fixed-pos">
            <globalState.Provider value={ { currentScreen, setCurrentScreen, profile, setProfile, deletingGoal, setDeletingGoal } }>
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
                    <>
                        { deletingGoal !== "" &&
                            <DeleteGoalScreen goalName={deletingGoal}/>
                        }
                        { deletingGoal === "" &&
                            <GoalsScreen/>
                        }
                    </>
                }
            </globalState.Provider>
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

export default App;
