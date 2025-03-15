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
    gameState: GameState.PLAYING
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

    if (wordleProxy.word[letterIndex].toLocaleLowerCase() === wordleProxy.attempts[rowIndex][letterIndex].toLocaleLowerCase()) {
        return "correct"

    }

    if (wordleProxy.word.toLocaleLowerCase().includes(letter.toLocaleLowerCase())) {
        return "wrong-position"
    }
    return "incorrect"
}

const setWord = (word: string) => {
    wordleProxy.word = word
}

const gameLost = () => wordleProxy.gameState === GameState.LOST

const gameWon = () => wordleProxy.gameState === GameState.WON

const gamePlaying = () => wordleProxy.gameState === GameState.PLAYING
