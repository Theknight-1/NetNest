import { Box, Typography, useTheme } from "@mui/material";
import Friend from "/src/components/Friends";
import WidgetWrapper from "/src/components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "/src/state/index.js";
import { API_URL } from "../../constant/config";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user?.friends);

    const getFriends = async (userId) => {
        const response = await fetch(
            `${API_URL}/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };



    useEffect(() => {
        getFriends(userId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {Array.isArray(friends) && friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
                {
                    friends?.length === 0 && (
                        <div style={{ textAlign: "center" }}>
                            NO FRIENDS TO SHOW
                            <br />
                            add some.
                        </div>
                    )
                }
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;