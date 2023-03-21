import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LineShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { SHARED_URL } from "../helpers/consts";
import { Box } from "@mui/material";

const SharedLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
      }}
    >
      <FacebookShareButton url={SHARED_URL}>
        <FacebookIcon size={33} round={true} />
      </FacebookShareButton>
      <FacebookShareButton url={SHARED_URL}>
        <FacebookMessengerIcon size={33} round={true} />
      </FacebookShareButton>
      <LineShareButton url={SHARED_URL}>
        <LinkedinIcon size={33} round={true} />
      </LineShareButton>
      <TelegramShareButton url={SHARED_URL}>
        <TelegramIcon size={33} round={true} />
      </TelegramShareButton>
    </Box>
  );
};

export default SharedLayout;
