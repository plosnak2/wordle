import backspaceIcon from './backspace.svg';

const ICONS = {
    backspace: backspaceIcon,
} as const;

export type IconType = keyof typeof ICONS;

export default ICONS;