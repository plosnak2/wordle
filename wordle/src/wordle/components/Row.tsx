import { WORD_LENGTH } from "../constants"
import Cell from "./Cell"
import "./row.css"

type Props = {
    row: string
    rowIndex: number
}

const Row = ({ row, rowIndex }: Props) => {
    return (
        <div className="row">
            {
                Array.from({ length: WORD_LENGTH }, (_, i) => {
                    return (
                        <Cell key={i} letter={row[i]} rowIndex={rowIndex} letterIndex={i}/>
                    )
                })
            }
        </div>
    )
}

export default Row