import { Box } from "@mui/material";
import { CSSProperties } from "react";

interface ImageProps {
  image: string | undefined;
  size: string;
}

const UserImage = ({ image, size }: ImageProps) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
