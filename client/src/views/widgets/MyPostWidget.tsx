import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setPosts } from "../../state";
import axios from "axios";
import { BASE_URL } from "../../helpers/consts";
import { toast } from "react-toastify";

interface MyPostProps {
  picturePath: string;
}

const MyPostWidget = ({ picturePath }: MyPostProps) => {
  const dispatch = useAppDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useAppSelector((state) => state.user)!;
  const token = useAppSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // @ts-ignore
  const mediumMain = palette.neutral.mediumMain;
  // @ts-ignore
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);

      if (image) {
        formData.append("picture", image);
        // @ts-ignore
        formData.append("picturePath", image.name);
      } else {
        toast.warn(" Please add image", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: <AddPhotoAlternateIcon />,
          style: {
            backgroundColor: "rgba(250,250,250,0.53)",
            borderRadius: "8px",
            boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          },
        });
        return;
      }

      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setPosts({ posts: response.data }));
      setImage(null);
      setPost("");
      toast.success(" Cool! Your post already created", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: <WallpaperIcon />,
        style: {
          backgroundColor: "rgba(250,250,250,0.53)",
          borderRadius: "8px",
          boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // @ts-ignore
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} size="60px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            // @ts-ignore
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            // @ts-ignore
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            // @ts-ignore
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      {/*@ts-ignore*/}
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            // @ts-ignore
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.main,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;

//test
