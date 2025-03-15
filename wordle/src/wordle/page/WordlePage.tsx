import { useEffect } from "react"
import { handleKeyPress, loadRandomWord } from "../proxy/wordle"
import "./wordlepage.css"
import Board from "../components/board/Board"
import { KEY_MAP } from "../constants"
import Keyboard from "../components/keyboard/Keyboard"
import Info from "../components/info/Info"


const WordlePage = () => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (KEY_MAP[e.code as keyof typeof KEY_MAP]) {
                handleKeyPress(e.code as keyof typeof KEY_MAP)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        loadRandomWord()
    }, [])

    return (
        <div className="page">
            <Info />
            <Board />
            <Keyboard />
        </div>
    )
}

export default WordlePage