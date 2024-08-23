
import { Box, useMediaQuery } from "@mui/material";
import NavbarPage from "../navbar/index";
import { useSelector } from "react-redux";
import UserWidget from "/src/scenes/widgets/UserWidget";
import PostsWidget from "/src/scenes/widgets/PostsWidget";
import MyPostWidget from "/src/scenes/widgets/MyPostWidget";
import AdvertWidget from "/src/scenes/widgets/AdvertWidget";
import FriendListWidget from "/src/scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);




  return (
    <Box>
      <NavbarPage />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : ""}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "25%" : undefined}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
        // mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "25%" : undefined}
        >
          <AdvertWidget />
          <FriendListWidget userId={_id} />
        </Box>
        
      </Box>
    </Box>
  );
};

export default HomePage;