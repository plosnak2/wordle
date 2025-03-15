import { ATTEMPTS } from "../../constants";
import { useWordle } from "../../proxy/wordle";
import Badge from "../badge/Badge";
import Row from "../row/Row";
import "./board.css";

const Board = () => {
    const { attempts, gameState, word } = useWordle()
    return (
        <div className="board">
        {
            Array.from({ length: ATTEMPTS }, (_, i) => (
                <Row key={i} row={attempts[i]} rowIndex={i}/>
            ))
        }
        <Badge gameState={gameState} word={word}/>
        </div>
    );
}

export default Board