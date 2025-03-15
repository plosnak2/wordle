import Icon from "../../../icons/Icon";
import { resetGame } from "../../proxy/wordle";
import "./info.css"

const Info = () => {
    return (
        <div className="info">
            <h1>This is just a hobby project ;)</h1>
            <a href="https://www.nytimes.com/games/wordle/index.html" className="original">Original project</a>
            <div className="socials">
                <a href="https://github.com/plosnak2" target="blank" className="icon"><Icon icon="github" size={40}/></a>
                <a href="https://sk.linkedin.com/in/jakub-zaukolec-8a36901b7" target="blank" className="icon"><Icon icon="linkedIn" size={40}/></a>
                <div onClick={resetGame}><Icon icon="restart" size={40}/></div>
            </div>
        </div>
    );
}

export default Info