import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, useMediaQuery } from '@mui/material';
import NavbarPage from '/src/scenes/navbar';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import FlexBetween from '/src/components/FlexBetween';


const ProfilePage = () => {
    const { userId } = useParams()
    const { palette } = useTheme();
    const theme = useTheme()
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const [user, setUser] = useState({})
    const token = useSelector((state) => state.token)

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
        getUser(userId)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <NavbarPage />
            <Box
                border={""}
                width="100%"
                height="90%"
                display="flex"
                sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box
                    height="90%"
                    width={isNonMobileScreens ? "65%" : "90%"}
                    display={isNonMobileScreens ? "flex" : ""}
                    flexDirection="row"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexBasis="50%"
                        sx={{
                            justifyContent: "center",
                            borderRadius: "15px",
                            margin: "auto",
                            padding: "1%",
                            backgroundColor: dark,
                            textAlign: "center"
                        }}
                    >
                        <Box
                            display="flex"
                            
                            flexBasis="20%"
                            sx={{
                                backgroundColor: "yellow",
                            }}
                        >
                            <FlexBetween>
                                <Box
                                    color={"black"}
                                    padding={"1rem"}
                                    
                                >
                                    <h1>NetNest</h1>
                                </Box>
                            </FlexBetween>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            position="relative"
                            alignItems="center"
                            flexBasis="60%"
                            sx={{
                                backgroundColor: `${theme.palette.mode === "dark" ? primaryLight : neutralLight}`
                            }}
                        >
                            <Typography
                                variant='h1'
                                fontWeight="800"
                                padding="2%"
                                fontSize="5rem"
                                position="absolute"
                                top="50px"
                                lineHeight={.7}
                            >
                                {user.firstName}<br />{user.lastName}
                            </Typography>
                            <Typography
                                variant='body1'
                                position="absolute"
                                top="200px"
                                left="100px"
                                right="100px"
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, atque? Nisi labore dolore ex veniam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima ipsum eum neque sit fugit dolorem veritatis illum quae natus praesentium?
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexBasis="20%"
                            sx={{
                                backgroundColor: "yellow"
                            }}
                        >

                        </Box>
                    </Box>
                    <Box
                        flexBasis="50%"
                    >
                        <img src={`http://localhost:5000/images/${user.picturePath}`} alt="User Image" height={"100%"} width={"100%"} style={{ objectFit: "cover", padding: "10px" }} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ProfilePage
