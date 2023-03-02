import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { BASE_URL } from "../helpers/consts";

interface FriendProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath?: string | undefined;
}

interface Friend {
  _id: string;
}

const Friend = ({ friendId, name, subtitle, userPicturePath }: FriendProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { _id } = useAppSelector((state) => state.user)!;
  const token = useAppSelector((state) => state.token);
  // @ts-ignore
  const friends = useAppSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  // @ts-ignore
  const main = palette.neutral.main;
  // @ts-ignore
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend: Friend) => friend._id === friendId);

  const patchFriend = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/users/${_id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setFriends({ friends: response.data }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
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
    </FlexBetween>
  );
};

export default Friend;
