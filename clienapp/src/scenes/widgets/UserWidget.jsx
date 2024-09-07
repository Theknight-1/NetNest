/* eslint-disable react/prop-types */
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Divider,
    useTheme,
    Button,
    TextField,
} from "@mui/material";
import UserImage from "/src/components/UserImage.jsx";
import FlexBetween from "/src/components/FlexBetween.jsx";
import WidgetWrapper from "/src/components/WidgetWrapper.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL } from "../../constant/config";
import { setLogin } from "../../state/index";
import { Link } from "react-router-dom";

const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [updateUser, setUpdateUser] = useState(false);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const [userSchema, setUserSchema] = useState({
        location: "",
        occupation: "",
        firstName: "",
    });

    // Toggle edit mode
    const handleUpdateUser = () => {
        if (!updateUser) {
            setUserSchema({
                location: user?.location || "",
                occupation: user?.occupation || "",
                firstName: user.firstName || "",
            });
        }
        setUpdateUser(!updateUser);
    };

    const submitUpdatedUser = async () => {
        if (
            userSchema.location === "" ||
            userSchema.occupation === "" ||
            userSchema.firstName === ""
        ) {
            return alert("Some fields are missing");
        }
        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSchema),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const data = await response.json();
            console.log(data);

            if (data) {
                dispatch(
                    setLogin({
                        user: data.updatedUser,
                        token: data.token,
                    })
                );
            }
            setUser(data.updatedUser);
            setUpdateUser(false); // Exit edit mode
        } catch (error) {
            console.log(error);
        }
    };

    // initially getting the user
    const getUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.2rem" p="1.3rem"  >
                <Link to={`/profilepage/${userId}`} style={{ textDecoration: "none" }}>
                    <FlexBetween gap="1rem"  >
                        <UserImage image={user.picturePath} />
                        <Box>
                            <Typography

                                variant="h4"
                                display={"flex"}
                                gap={"2px"}
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {updateUser ? (
                                    <TextField
                                        value={userSchema.firstName}
                                        onChange={(e) =>
                                            setUserSchema((prevState) => ({
                                                ...prevState,
                                                firstName: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span>{user.firstName}</span>
                                )}

                                {!updateUser && <span>{user.lastName}</span>}
                            </Typography>
                            <Typography color={medium}>
                                {user?.friends?.length} friends
                            </Typography>
                        </Box>
                    </FlexBetween>
                </Link>
                <Button
                    onClick={handleUpdateUser}
                    sx={{
                        m: "1rem 0",
                        p: "0.4rem",
                        backgroundColor: palette.primary.dark,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                        borderRadius: "50px",
                    }}
                >
                    <span
                        style={{ fontSize: "10px", display: "flex", alignItems: "center" }}
                    >
                        {updateUser ? (
                            "Cancel"
                        ) : (
                            <>
                                {" "}
                                <ManageAccountsOutlined /> Edit
                            </>
                        )}
                    </span>
                </Button>
            </FlexBetween>

            <Divider />

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    {updateUser ? (
                        <TextField
                            fullWidth
                            value={userSchema.location}
                            onChange={(e) =>
                                setUserSchema((prevState) => ({
                                    ...prevState,
                                    location: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <Typography color={medium}>{user.location}</Typography>
                    )}
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    {updateUser ? (
                        <TextField
                            fullWidth
                            value={userSchema.occupation}
                            onChange={(e) =>
                                setUserSchema((prevState) => ({
                                    ...prevState,
                                    occupation: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <Typography color={medium}>{user.occupation}</Typography>
                    )}
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>
                        Who&rsquo;s viewed your profile
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {user.viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                        {user.impression ? user.impression : "2500"}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img
                            src="/twitter.png"
                            alt="twitter"
                            style={{ width: " 40px", height: "40px" }}
                        />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img
                            src="/linkedin.png"
                            alt="linkedin"
                            style={{ width: " 50px", height: "50px" }}
                        />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
            {updateUser && (
                <Button
                    fullWidth
                    onClick={submitUpdatedUser}
                    sx={{
                        m: "1rem 0",
                        p: "0.5rem",
                        backgroundColor: palette.primary.dark,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                        borderRadius: "50px",
                        fontWeight: "bolder",
                        fontSize: "12px",
                    }}
                >
                    Submit
                </Button>
            )}
        </WidgetWrapper>
    );
};

export default UserWidget;
