import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box
            width={size}
            height={size}
            sx={{
                "&:hover": {
                    transition: "all .2s ease-in",
                    transform: "scale(1.04)",
                    cursor: "pointer",
                },
            }}
        >
            <img
                style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    padding: ".2rem",
                    border: "1px solid white", // Adds a white border
                    outline: "none", // Removes default focus outline
                }}
                width={size}
                height={size}
                alt="user"
                src={`${image}`}
                onError={(e) => console.error("Image failed to load", { e })}
            />
        </Box>
    );
};

export default UserImage;
