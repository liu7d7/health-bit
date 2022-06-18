import React, {useState} from "react";
import {Btn, ClickBtn} from "./btn";
import {Screen} from "../App";

const quotes = [
    "“Mindset is what separates the best from the rest” - Unknown",
    "“A goal is just an awesome way to force growth on yourself” – Deena Kastor",
    "“One of the greatest moments is realizing that 2 months ago, your body couldn’t do what it just accomplished.” - Unknown",
    "“I often hear someone say I’m not a real runner. We are all runners, some just run faster than others. I never met a fake runner.” – Bart Yasso",
    "“You don’t need to be extreme, just consistent.” - Unknown",
    "“Time, Effort, Sacrifice, and Sweat. How will you pay for your goals?” – Usain Bolt",
    "“Keep working, even when no one is watching”- Alex Morgan",
    "“We are what we repeatedly do. Excellence then is not an act, but a habit.” – Aristotle",
    "“He who is not courageous enough to take risks, will accomplish nothing in life.” – Muhammad Ali",
    "“It’s supposed to be hard.  If it wasn’t hard, everyone would do it.  The hard is what makes it great.”  — Tom Hanks",
    "A 30-minute workout is only ~2% of your day.",
    "At least you're not watching YouTube right now!"
]

export const MotivationScreen = () => {
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