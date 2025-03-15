type RandomWordResponse = string[]

const fallbackWord = 'react'

const RANDOM_WORD_API = 'https://random-word-api.vercel.app/api?words=1&length=5'

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export const fetchRandomWord = async (): Promise<string> => {
    const response = await fetch(RANDOM_WORD_API)
    const data: RandomWordResponse = await response.json()
    return data[0] ?? fallbackWord
}

// Don't really care about the response, just the status code
export const fetchDictionaryWord = async (word: string): Promise<number> => {
    const response = await fetch(DICTIONARY_API + word)
    return response.status
}
