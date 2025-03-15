import { useMemo } from "react"
import { evaluateLetter, useWordle } from "../proxy/wordle"
import "./cell.css"

type Props = {
    letter?: string
    rowIndex: number
    letterIndex: number
}

const Cell = ({ letter, rowIndex, letterIndex }: Props) => {
    const { currentAttemptIndex, gameState } = useWordle()

    const cellClass = useMemo(() => {
        return evaluateLetter(rowIndex, letterIndex, letter) ?? ""
    }, [currentAttemptIndex, gameState])

    return (
        <div className={"cell " + cellClass}>
            {letter}
        </div>
    )
}

export default Cell