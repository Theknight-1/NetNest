import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form'



const LoginPage = () => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    return (
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1rem 20%" textAlign="center">
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="#33699a"
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: "#004d40",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            transform: "scale(1.1)"
                        },
                    }}
                >
                    NetNest
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                padding="2rem"
                margin="2rem auto"
                borderRadius="2rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight="500"
                    variant='h4'
                    textAlign="center"
                    sx={{
                        mb: "1.5rem",
                        "&:hover": {
                            color: "#33699a",
                            cursor: "pointer",
                            transition: "all 1s ease-in-out",
                            transform: "scale(1.1)"
                        }
                    }}
                >
                    Welcome to NetNest, Make a Nest with you family and friends
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage
