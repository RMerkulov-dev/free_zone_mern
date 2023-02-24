import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setPost } from "../../state";

interface PostWidgetProps {
  key: string;
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath?: string;
  userPicturePath?: string;
  likes: Map<string, boolean>;
  comments: [];
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}: PostWidgetProps) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  // @ts-ignore
  const loggedInUserId = useAppSelector((state) => state?.user._id);
  // @ts-ignore
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  // @ts-ignore
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return <div></div>;
};

export default PostWidget;
