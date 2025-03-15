import { proxy, useSnapshot } from 'valtio'
import { fetchDictionaryWord, fetchRandomWord } from '../../api/api'
import { ATTEMPTS, WORD_LENGTH } from '../constants'
import { KEY_MAP } from '../constants'
import { toast } from 'react-toastify'

enum GameState {
    WON = "WON",
    PLAYING = "PLAYING",
    LOST = "LOST"
}

type WordleProxyState = {
    word: string | null
    attempts: string[]
    currentAttemptIndex: number
    gameState: GameState
}

const defaultState: WordleProxyState = {
    word: null,
    attempts: Array(ATTEMPTS).fill(''),
    currentAttemptIndex: 0,
    gameState: GameState.PLAYING,
}

const wordleProxy = proxy<WordleProxyState>(defaultState)

export const useWordle = () => useSnapshot(wordleProxy)

export const loadRandomWord = async () => {
    const word = await fetchRandomWord()
    setWord(word)
}

export const handleKeyPress = async (key: keyof typeof KEY_MAP) => {
    if (!gamePlaying()) {
        return
    }

    const currentAttempt = wordleProxy.attempts[wordleProxy.currentAttemptIndex]
    if (key === "Backspace") {
        wordleProxy.attempts[wordleProxy.currentAttemptIndex] = currentAttempt.slice(0, -1)
        return
    }

    if (key === "Enter") {
        if (currentAttempt.length === 0) {
            return
        }

        if (currentAttempt.length !== WORD_LENGTH) {
            toast.error("Too few characters 😢")
            return
        }

        const res = await fetchDictionaryWord(currentAttempt)
        if (res !== 200) {
            toast.error("Not a valid word 😢")
            return
        }

        if (wordleProxy.word?.toLocaleLowerCase() === currentAttempt.toLowerCase()) {
            toast.success("You won! 🎉")
            wordleProxy.gameState = GameState.WON
            return
        }

        if (wordleProxy.currentAttemptIndex === ATTEMPTS - 1) {
            toast.error("You lost! 😢")
            wordleProxy.gameState = GameState.LOST
            return
        }

        wordleProxy.currentAttemptIndex++
        return
    }

    if (currentAttempt.length >= WORD_LENGTH) {
        return
    }

    const letter = KEY_MAP[key]
    wordleProxy.attempts[wordleProxy.currentAttemptIndex] += letter
}

export const evaluateLetter = (rowIndex: number, letterIndex: number, letter?: string) => {
    if (!letter) {
        return ""
    }

    if (rowIndex >= wordleProxy.currentAttemptIndex) {
        if (rowIndex === wordleProxy.currentAttemptIndex && gameWon()) {
            return "correct"
        }

        if (!gameLost()) {
            return ""
        }    
    }

    if (!wordleProxy.word) {
        return null
    }

    if (wordleProxy.word[letterIndex].toLowerCase() === wordleProxy.attempts[rowIndex][letterIndex].toLowerCase()) {
        return "correct"

    }

    if (wordleProxy.word.toLowerCase().includes(letter.toLowerCase())) {
        return "wrong-position"
    }
    return "incorrect"
}

export const evaluateKey = (key: string) => {
    if (key === "Enter" || key === "Backspace") {
        return ""
    }

    if (gameWon() && wordleProxy.word?.toLowerCase().includes(key.toLowerCase())) {
        return "correct"
    }

    const previousAttempts = wordleProxy.attempts.slice(0, wordleProxy.currentAttemptIndex)

    return resolveKeyPosition(previousAttempts, key)
}

const resolveKeyPosition = (attempts: string[], letter: string): string => {
    let position = ""
    if (wordleProxy.word?.toLowerCase().includes(letter.toLowerCase())) {
        for(let i = 0; i < attempts.length; i++) {
            if (attempts[i].toLowerCase().includes(letter.toLowerCase())) {
                if (position !== "correct") { 
                    position = "wrong-position"
                } 
            }

            for(let j = 0; j < attempts[i].length; j++) {
                if (attempts[i][j].toLocaleLowerCase() === letter.toLowerCase()) {
                    if (wordleProxy.word[j].toLowerCase() === letter.toLowerCase()) {
                        position = "correct"
                    }
                    
                }
            }
        }
    }

    if (position === "") {
        position = attempts.some(attempt => attempt.toLowerCase().includes(letter.toLowerCase())) ? "incorrect" : ""
    }

    return position
}

const setWord = (word: string) => {
    wordleProxy.word = word
}

const gameLost = () => wordleProxy.gameState === GameState.LOST

const gameWon = () => wordleProxy.gameState === GameState.WON

const gamePlaying = () => wordleProxy.gameState === GameState.PLAYING
