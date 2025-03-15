import { KEYBOARD_LAYOUT } from "../../constants"
import Key from "../key/Key"
import "./keyboard.css"

const Keyboard = () => {
    return (
        <div className="keyboard">
            {Array.from({ length: KEYBOARD_LAYOUT.length }, (_, i) => {
                return (
                    <div key={`keyboard-row-${i}`} className="keyboard-row">
                        {KEYBOARD_LAYOUT[i].map((letter, j) => {
                            return <Key key={`keyboard-row-${i}-letter-${j}`} keyProp={letter} />
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Keyboard