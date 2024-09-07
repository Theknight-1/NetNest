import { useTheme } from "@emotion/react";


const About = () => {
    const { palette } = useTheme();
    const theme = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;

    return (
        <div>
            <h2 style={{ color: `${primaryDark}` }}>About</h2>
            flkajfds
            <br />
            alhfl;ajfd
        </div>
    )
}

export default About
