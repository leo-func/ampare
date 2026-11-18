import Svg, { Circle, Path } from "react-native-svg";

type IconProps = {
    size?: number;
    color?: string;
    filled?: boolean; 
};

export function HomeIcon({ size = 24, color = "#fff", filled = false }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={filled ? color : "none"}
            />
        </Svg>
    );
}

export function UsersIcon({ size = 24, color = "#fff", filled = false }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx={9}
                cy={8}
                r={3.5}
                stroke={color}
                strokeWidth={1.8}
                fill={filled ? color : "none"}
            />
            <Path
                d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6Z"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={filled ? color : "none"}
            />
            <Path
                d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.3c2 .7 3.5 2.6 3.5 5.7"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                fill="none"
            />
        </Svg>
    );
}

export function SettingsIcon({ size = 24, color = "#fff", filled = false }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={filled ? color : "none"}
            />
            <Circle
                cx={12}
                cy={12}
                r={3}
                stroke={filled ? "#5E0912" : color}
                strokeWidth={1.8}
                fill={filled ? "#5E0912" : "none"}
            />
        </Svg>
    );
}