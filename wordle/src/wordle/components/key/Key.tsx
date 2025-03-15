import Icon from "../../../icons/Icon"
import { KeyType, REVERSE_KEY_MAP } from "../../constants"
import { handleKeyPress } from "../../proxy/wordle"
import "./key.css"

type Props = {
    keyProp: KeyType
}

const Key = ({ keyProp }: Props) => {
    const handleClickKey = () => {
        handleKeyPress(REVERSE_KEY_MAP[keyProp])
    }
    return (
        <div className="key" data-key={keyProp} onClick={handleClickKey}>
            {keyProp === "Backspace" ? <Icon icon="backspace" size={20}/> : keyProp}
        </div>
    )
}

export default Key