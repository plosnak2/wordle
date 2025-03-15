type RandomWordResponse = string[]

const fallbackWord = 'react'

const fetchRandomWord = async (): Promise<string> => {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5')
    const data: RandomWordResponse = await response.json()
    return data[0] ?? fallbackWord
}

export default fetchRandomWord