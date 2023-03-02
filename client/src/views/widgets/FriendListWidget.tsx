import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { setFriends } from "../../state";
import { useAppDispatch, useAppSelector } from "../../hooks";
import axios from "axios";

interface FriendListProps {
  userId: string | undefined;
}

const FriendListWidget = ({ userId }: FriendListProps) => {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const token = useAppSelector((state) => state.token);
  // @ts-ignore
  const friends = useAppSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(setFriends({ friends: response.data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // @ts-ignore
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
        {friends.map((friend: any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
