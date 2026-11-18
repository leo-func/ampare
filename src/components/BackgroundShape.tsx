import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

type Props = SvgProps & {
    colorStart?: string;
    colorMid?: string;
    colorEnd?: string;
    ringColor?: string;
};

export function BackgroundShape({
    colorStart = "#5E0912",
    colorMid = "#8A0F1A",
    colorEnd = "#AA1822",
    ringColor = "#fff",
    ...rest
}: Props) {
    const shape = "M0 0H390V150C320 174 250 166 190 177C120 189 50 187 0 166Z";

    return (
        <Svg
            width="100%"
            height="100%"
            viewBox="0 0 390 190"
            preserveAspectRatio="none"
            {...rest}
        >
            <Defs>
                <LinearGradient id="hg" x1="0" y1="0.2" x2="1" y2="0">
                    <Stop offset="0" stopColor={colorStart} />
                    <Stop offset="0.6" stopColor={colorMid} />
                    <Stop offset="1" stopColor={colorEnd} />
                </LinearGradient>
                <ClipPath id="cp">
                    <Path d={shape} />
                </ClipPath>
            </Defs>

            <Path d={shape} fill="url(#hg)" />

            <G clipPath="url(#cp)" fill="none" stroke={ringColor} strokeWidth={1.5}>
                <Circle cx={340} cy={40} r={46} strokeOpacity={0.14} />
                <Circle cx={340} cy={40} r={86} strokeOpacity={0.1} />
                <Circle cx={340} cy={40} r={126} strokeOpacity={0.07} />
                <Circle cx={340} cy={40} r={166} strokeOpacity={0.05} />
            </G>
        </Svg>
    );
}