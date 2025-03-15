import { useMemo } from "react"
import Icon from "../../../icons/Icon"
import { KeyType, REVERSE_KEY_MAP } from "../../constants"
import { evaluateKey, handleKeyPress, useWordle } from "../../proxy/wordle"
import "./key.css"

type Props = {
    keyProp: KeyType
}

const Key = ({ keyProp }: Props) => {
    const { currentAttemptIndex, gameState } = useWordle()
    const handleClickKey = () => {
        handleKeyPress(REVERSE_KEY_MAP[keyProp])
    }

    const keyClass = useMemo(() => {
        return evaluateKey(keyProp) ?? ""
    }, [currentAttemptIndex, gameState])

    return (
        <div className={"key " + keyClass} data-key={keyProp} onClick={handleClickKey}>
            {keyProp === "Backspace" ? <Icon icon="backspace" size={20}/> : keyProp}
        </div>
    )
}

export default Key