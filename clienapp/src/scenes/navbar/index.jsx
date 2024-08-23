import React, { useState, useEffect } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from "../../components/FlexBetween"
import UserImage from '../../components/UserImage'
import { setMode, setLogout } from '/src/state/index.js'



const NavbarPage = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [fullName, setFullName] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userId, picturePath } = user;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  useEffect(() => {
    if (user === null) {
      navigate("/")
    } else {
      const Name = ` ${user.firstName} ${user.lastName} `
      setFullName(Name)
    }
  }, [user])

  return (
    <FlexBetween padding='.6rem 6%' backgroundColor={alt}>
      <FlexBetween gap="1.7rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem,2.25rem)"
          color="#33699a"
          onClick={() => navigate("/home")}
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
        {
          isNonMobileScreens && (
            <FlexBetween backgroundColor={
              theme.palette.mode = "light" ? dark : neutralLight
            }
              borderRadius="9px"
              gap="3re"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder='Search...' style={{ color: `${theme.palette.mode === "dark" ? dark : neutralLight}`, fontSize: "15px" }} />
              <IconButton>
                <Search style={{ color: `${theme.palette.mode === "dark" ? dark : neutralLight}` }} />
              </IconButton>
            </FlexBetween>
          )
        }
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                display: "flex",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>


          {/* DISPLAY THE USER IMAGE */}
          <FlexBetween
            gap="0.9rem"
            p="1.1rem"
          // onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} size={"40px"} />
            </FlexBetween>
          </FlexBetween>

        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="400px"
          minWidth="200px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="0.5rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25 px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default NavbarPage
