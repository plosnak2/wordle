import backspaceIcon from './backspace.svg';
import githubIcon from './github.svg';
import linkedInIcon from './linkedin.svg';
import restartIcon from './restart.svg';

const ICONS = {
    backspace: backspaceIcon,
    github: githubIcon,
    linkedIn: linkedInIcon,
    restart: restartIcon,
} as const;

export type IconType = keyof typeof ICONS;

export default ICONS;