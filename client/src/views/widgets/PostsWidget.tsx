import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import axios from "axios";
import { BASE_URL } from "../../helpers/consts";

interface PostsWidgetProps {
  userId: string | undefined;
  isProfile: boolean;
}

const PostsWidget = ({ userId, isProfile = false }: PostsWidgetProps) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const token = useAppSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setPosts({ posts: response.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setPosts({ posts: response.data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
