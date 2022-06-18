import React, {useContext, useState} from "react";
import {ClickBtn} from "./btn";
import {TextBox} from "./text-box";
import {globalState, Profile_t} from "../App";

type DeleteGoalScreenProps = {
    goalName: string
}

export type GoalProps = {
    name: string
    until: Date
}

export const DeleteGoalScreen = (props:DeleteGoalScreenProps) => {

    const global = useContext(globalState)

    return (
        <div className={"grid grid-cols-1 gap-y-4 place-items-center"}>
            <div className={"kanit text-center text-xl new-text-aqua"}>
                {`Are you sure you want to delete goal "${props.goalName}?"`}
            </div>
            <ClickBtn display={"Yes, delete it!"} sizeCustomCss={"width-66pc height-6pc"} onClick={ () => {
                const oldProfile = global.profile
                const newGoals: GoalProps[] = []
                for (const g of oldProfile.goals) {
                    if (g.name !== global.deletingGoal) {
                        newGoals.push(g)
                    }
                }
                const newProfile = {
                    name: oldProfile.name,
                    sugarIn: oldProfile.sugarIn,
                    caloriesIn: oldProfile.caloriesIn,
                    caloriesOut: oldProfile.caloriesOut,
                    goals: newGoals
                }
                global.setProfile(newProfile)
                global.setDeletingGoal("")
            } }/>
            <ClickBtn display={"No, I'd like to keep working on it!"} sizeCustomCss={"width-66pc height-6pc"} onClick={ () => global.setDeletingGoal("") }/>
        </div>
    )
}

export const Goal = (props:GoalProps) => {

    const global = useContext(globalState)
    const small = global.profile.goals.length > 5

    return (
        <div>
            <button
                className={`px-2 pb-1 text-center ${small ? "text-xl" : "text-2xl"} kanit new-text-aqua transition ease-in-out delay-75 hover:bg-red-200 duration-300`}
                onClick={ (ev) => {
                    global.setDeletingGoal(props.name)
                } }
            >
                { props.name }
            </button>
            <div className={`text-center ${small ? "text-l" : "text-xl" } kanit new-text-aqua`}>
                Until
                { props.until.getMilliseconds() === 0 &&
                    ` ∞`
                }
                { props.until.getMilliseconds() !== 0 &&
                    ` ${props.until.toLocaleDateString('en-US')}`
                }
            </div>
        </div>
    )
}

export type AddGoalScreenProps = {
    setAddingGoal: (_:boolean) => void
}

export const AddGoalScreen = (props:AddGoalScreenProps) => {

    const [name, setName] = useState("Name of goal")
    const [duration, setDuration] = useState("End of goal (MM/DD/YY), blank if no end")
    const [errName, setErrName] = useState(false)
    const [errDuration, setErrDuration] = useState(false)
    const global = useContext(globalState)

    return (
        <div className={"grid grid-cols-1 gap-y-4 place-items-center"}>
            <TextBox defaultText={"Name of goal"} customCss={"new-button-aqua width-66pc focus:border-none"} onChange={ (str:string) => setName(str) }></TextBox>
            { errName &&
                <div className={"kanit text-center new-text-aqua"}>
                    ^^^ Please enter a non-empty string for the name. ^^^
                </div>
            }
            <TextBox defaultText={"End of goal (MM/DD/YYYY), blank if no end"} customCss={"new-button-aqua width-66pc focus:border-none"} onChange={ (str:string) => setDuration(str) }></TextBox>
            { errDuration &&
                <div className={"kanit text-center new-text-aqua"}>
                    ^^^ Enter in (MM/DD/YYYY) format or leave blank ^^^
                </div>
            }
            <ClickBtn display={"+ Add this goal!"} sizeCustomCss={"height-4pc width-66pc"} onClick={ () => {
                const _errName = name === "", _errDuration = (new Date(duration)).toString() === "Invalid Date" && duration !== ""
                if (_errName) {
                    setErrName(true)
                }
                if (_errDuration) {
                    setErrDuration(true)
                }
                if (_errName || _errDuration) {
                    return
                }

                const oldProfile = global.profile
                const newGoals:GoalProps[] = []
                oldProfile.goals.forEach((g) => newGoals.push(g))
                newGoals.push({
                    name: name,
                    until: duration === "" ? new Date(0) : new Date(duration)
                } as GoalProps)
                const newProfile = {
                    name: oldProfile.name,
                    sugarIn: oldProfile.sugarIn,
                    caloriesIn: oldProfile.caloriesIn,
                    caloriesOut: oldProfile.caloriesOut,
                    goals: newGoals
                } as Profile_t
                global.setProfile(newProfile)
                props.setAddingGoal(false)
            } }></ClickBtn>
        </div>
    )
}

export const GoalsScreen = () => {

    const global = useContext(globalState)
    const goals = global.profile.goals
    const goalsHTML = []
    for (const goal of goals) {
        goalsHTML.push(<Goal name={goal.name} until={goal.until}></Goal>)
    }
    const [addingGoal, setAddingGoal] = useState(false)
    const small = global.profile.goals.length > 5

    return (
        <div className={"grid grid-cols-1 place-items-center"}>
            { !addingGoal &&
                <div className="grid grid-cols-1 place-items-center width-75pc gap-y-4 max-height-66pc overflow-y-auto pb-5">
                    {goalsHTML}
                    <ClickBtn display={"+ Add Goal"} sizeCustomCss={small ? "width-66pc height-6pc text-l" : "width-66pc height-8pc"} onClick={() => setAddingGoal(true)}></ClickBtn>
                </div>
            }
            { addingGoal &&
                <AddGoalScreen setAddingGoal={setAddingGoal}></AddGoalScreen>
            }
        </div>
    )
}