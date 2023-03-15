import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addComment, setPost } from "../../state";
import { BASE_URL } from "../../helpers/consts";
import axios from "axios";

interface PostWidgetProps {
  key: string;
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath?: string;
  userPicturePath?: string;
  likes: { [key: string]: boolean };
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
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  console.log(allComments);

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);

  const loggedInUserId = useAppSelector((state) => state?.user!._id);

  const isLiked = loggedInUserId
    ? Boolean(likes[loggedInUserId as string])
    : false;
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  // @ts-ignore
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/posts/${postId}/like`,
        { userId: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setPost({ post: response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  //ADD COMMENTS

  const addCommentPost = async (comment: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/${postId}/comment`,
        { comment, userId: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addComment(response.data.comments));
      setComment("");
      setAllComments(response.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${BASE_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{allComments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <InputBase
            placeholder="Add your comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              width: "100%",
              // @ts-ignore
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 4rem",
            }}
          />
          <MapsUgcIcon
            onClick={() => addCommentPost(comment)}
            sx={{
              position: "absolute",
              top: "28%",
              left: "3%",
              // @ts-ignore
              backgroundColor: palette.neutral.light,
              opacity: "0.5",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
      )}
      {isComments && (
        <Box mt="1rem">
          {allComments.map((comment, i) => (
            <Box
              key={`${name}-${i}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                color: palette.primary.main,
              }}
            >
              <AccountCircleIcon />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
