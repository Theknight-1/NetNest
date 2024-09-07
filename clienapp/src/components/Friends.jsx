/* eslint-disable react/prop-types */
import {
    DeleteOutlineSharp,
    PersonAddOutlined,
    PersonRemoveOutlined,
} from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "/src/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { API_URL } from "../constant/config";
import { setPosts } from "../state/index";
import { useLoading } from "../hooks/useLoading";

const Friend = ({
    friendId,
    name,
    subtitle,
    userPicturePath,
    isProfile,
    postId,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _id = useSelector((state) => state.user?._id);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user?.friends);
    const { isLoading, startLoading, stopLoading } = useLoading();

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends?.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(`${API_URL}/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };
    const handleDeletePost = async () => {
        startLoading();
        setInterval(async () => {
            const response = await fetch(`${API_URL}/posts/deletepost/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                stopLoading();
                dispatch(setPosts({ posts: data }));
            }
        }, 2000)

    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profilepage/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            {friendId !== _id && (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            )}
            {friendId === _id && isProfile && (
                <Button onClick={handleDeletePost}>
                    {isLoading ? (<Box
                        component="span"
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 15,  // Customize width and height for the spinner
                            height: 15,
                        }}
                    >
                        <CircularProgress size={15} color="primary" />
                    </Box>) : (<>Delete <DeleteOutlineSharp /></>)}
                </Button>
            )}
        </FlexBetween>
    );
};

export default Friend;
