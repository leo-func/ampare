import Svg, { Circle, Path } from "react-native-svg"

type IconProps = { size?: number, color?: string }

export function UserIcon({ size = 20, color = "#8B0D1A" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
            <Path
                d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export function PhoneIcon({ size = 20, color = "#8B0D1A" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export function PlusIcon({ size = 20, color = "#fff" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 5v14M5 12h14"
                stroke={color}
                strokeWidth={2.4}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export function TrashIcon({ size = 22, color = "#8B0D1A" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}