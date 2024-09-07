import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import FlexBetween from "/src/components/FlexBetween";
import WidgetWrapper from "/src/components/WidgetWrapper";
import UserImage from "/src/components/UserImage"; // Assuming you have this component
import PostWidget from "../../scenes/widgets/PostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import About from "../../components/About";

const ProfilePage = () => {
    const { userId } = useParams();
    const { palette } = useTheme();
    const theme = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const [user, setUser] = useState({});
    const token = useSelector((state) => state.token);


    // check for the screen size
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async (userId) => {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser(userId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            width="100%"
            padding="1rem 6%"
        >
            <WidgetWrapper>
                {/* Cover Picture Section */}
                <Box
                    position="relative"
                    width="100%"
                    height="200px"
                    sx={{
                        backgroundImage: `url(https://images.template.net/wp-content/uploads/2014/11/HD-LANDSCAPE-WALLPAPER-FACEBOOK-COVER.jpg?width=530)`, // Replace with the actual cover image URL
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px", // optional, for rounded corners
                    }}
                >
                    {/* User Image in Absolute Position */}
                    <Box
                        position="absolute"
                        bottom="-30px" // Adjust this value as needed
                        left="20px"
                        zIndex="10"
                        width={"130px"}
                        height={"130px"}
                    >
                        <UserImage image={user.picturePath} size="100%" />
                    </Box>
                    {/* User Image in Absolute Position */}
                    <Box
                        position="absolute"
                        bottom="30px" // Adjust this value as needed
                        right="20px"
                        zIndex="10"
                    >
                        <Button
                            fullWidth
                            sx={{
                                px: "3rem",
                                py: "0.5rem",
                                backgroundColor: palette.primary.dark,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                                border: "1px solid black",
                                borderRadius: "10px",
                                fontSize: "12px",
                                fontWeight: "900"
                            }}
                        >
                            Edit cover
                        </Button>
                    </Box>
                </Box>
                {/* User Info Section */}
                <Box marginTop="40px" display={"flex"} justifyContent={"space-between"} alignContent={"baseline"}> {/* Adjust margin for spacing */}
                    <Box>
                        <Typography variant="h4" color={dark} fontWeight="500">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography color={medium}>
                            CTO {/* Replace with actual position or additional info */}
                        </Typography>
                    </Box>
                    <Box
                        marginRight={"20px"}
                    >
                        <Button
                            fullWidth
                            sx={{
                                px: "3rem",
                                py: "0.5rem",
                                backgroundColor: palette.primary.dark,
                                color: palette.background.alt,
                                border: "1px solid black",
                                "&:hover": { color: palette.primary.main },
                                borderRadius: "10px",
                                fontWeight: "bolder",
                                fontSize: "12px",
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection={isNonMobileScreens ? "row" : "column"}
                    justifyContent={"space-between"}
                >
                    <About />
                    <Box width={"100%"}>
                        <PostsWidget userId={userId} isProfile={true} />
                    </Box>

                </Box>
            </WidgetWrapper>

        </Box>
    );
};

export default ProfilePage;
