import { ATTEMPTS } from "../../constants";
import { useWordle } from "../../proxy/wordle";
import Row from "../row/Row";
import "./board.css";

const Board = () => {
    const { attempts } = useWordle()
    return (
        <div className="board">
        {
            Array.from({ length: ATTEMPTS }, (_, i) => (
                <Row key={i} row={attempts[i]} rowIndex={i}/>
            ))
        }
        </div>
    );
}

export default Board