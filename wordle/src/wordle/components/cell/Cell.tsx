import { useMemo } from "react"
import "./cell.css"
import { evaluateLetter, useWordle } from "../../proxy/wordle"

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