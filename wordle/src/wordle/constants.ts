export const ATTEMPTS = 6
export const WORD_LENGTH = 5

export const KEY_MAP = {
    'KeyA': 'A',
    'KeyB': 'B',
    'KeyC': 'C',
    'KeyD': 'D',
    'KeyE': 'E',
    'KeyF': 'F',
    'KeyG': 'G',
    'KeyH': 'H',
    'KeyI': 'I',
    'KeyJ': 'J',
    'KeyK': 'K',
    'KeyL': 'L',
    'KeyM': 'M',
    'KeyN': 'N',
    'KeyO': 'O',
    'KeyP': 'P',
    'KeyQ': 'Q',
    'KeyR': 'R',
    'KeyS': 'S',
    'KeyT': 'T',
    'KeyU': 'U',
    'KeyV': 'V',
    'KeyW': 'W',
    'KeyX': 'X',
    'KeyY': 'Y',
    'KeyZ': 'Z',
    'Backspace': 'Backspace',
    'Enter': 'Enter',
} as const

export const REVERSE_KEY_MAP = Object.fromEntries(
    Object.entries(KEY_MAP).map(([key, value]) => [value, key])
) as Record<string, keyof typeof KEY_MAP>;

export type KeyType = (typeof KEY_MAP)[keyof typeof KEY_MAP]

export const KEYBOARD_LAYOUT: KeyType[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter','Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]