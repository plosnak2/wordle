import ICONS, { IconType } from "./ICONS"

type Props = {
    icon: IconType
    size?: number
}

const Icon = ({ icon, size = 20 }: Props) => {
    return (
        <img src={ICONS[icon]} alt={icon} width={size}/>
    )
}

export default Icon