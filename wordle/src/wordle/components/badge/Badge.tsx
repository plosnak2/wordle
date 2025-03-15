import { GameState } from "../../proxy/wordle";
import "./badge.css";
import { memo } from "react";

type Props = {
    gameState: GameState;
    word: string | null;
}

const Badge = memo(({ gameState, word }: Props) => {
    if (gameState !== GameState.LOST) {
        return null;
    }

    return <div className="badge">{word?.toUpperCase()}</div>;
}, (prevProps, nextProps) => {
    return prevProps.gameState === nextProps.gameState && prevProps.word === nextProps.word;
});

export default Badge;
