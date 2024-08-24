import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // If using react-router for navigation

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/home"); // Navigate back to the home page
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: "center",
                paddingTop: 8,
                paddingBottom: 8,
            }}
        >
            <Box
                sx={{
                    fontSize: "100px",
                    fontWeight: "bold",
                    color: "primary.main",
                    marginBottom: 2,
                }}
            >
                404
            </Box>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    marginBottom: 2,
                }}
            >
                Oops! The page you are looking for does not exist.
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                    marginBottom: 4,
                }}
            >
                It might have been moved or deleted.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
                sx={{
                    paddingX: 3,
                    paddingY: 1,
                    fontSize: "1rem",
                }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default NotFound;
