import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {

    return (
        <Box width={size} height={size}
            sx={{
                "&:hover": {
                    transition: "all .2s ease-in",
                    transform: "scale(1.04)",
                    cursor: "pointer",
                }
            }}
        >
            <img
                style={{ objectFit: "cover", borderRadius: "50%", padding: ".2rem" }}
                width={size}
                border="1px white"
                height={size}
                alt="user"
                src={`https://netnest.onrender.com/images/${image}`}
                onError={(e) => console.error("Image failed to load", { e })}
            />
        </Box>
    );
};

export default UserImage;