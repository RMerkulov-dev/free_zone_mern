import { Avatar, Box } from "@mui/material";
import { BASE_URL } from "../helpers/consts";

interface ImageProps {
  image: string | undefined;
  size: string;
}

const UserImage = ({ image, size }: ImageProps) => {
  return (
    <Box width={size} height={size}>
      {!image ? (
        <Avatar />
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`${BASE_URL}/assets/${image}`}
        />
      )}
    </Box>
  );
};

export default UserImage;
