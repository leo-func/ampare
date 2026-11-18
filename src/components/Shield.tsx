
import Svg, { Path } from "react-native-svg";

interface ShieldHeartIconProps {
  size?: number;
  color?: string;
}

export function ShieldHeartIcon({
  size = 38,
  color = "#FFFFFF",
}: ShieldHeartIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 34 38"
      fill="none"
    >
      <Path
        d="M17 2L4 6.5V18C4 26 9.5 32.5 17 36C24.5 32.5 30 26 30 18V6.5Z"
        stroke={color}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />

      <Path
        d="M17 25C12 21 10 18.5 10 16C10 14 11.6 12.5 13.5 12.5C15 12.5 16.3 13.3 17 14.6C17.7 13.3 19 12.5 20.5 12.5C22.4 12.5 24 14 24 16C24 18.5 22 21 17 25Z"
        fill={color}
      />
    </Svg>
  );
}
