import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserWidgetProps {
  userId: string;
  picturePath: string;
}

const UserWidget = ({ userId, picturePath }: UserWidgetProps) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);
  // @ts-ignore
  const dark = palette.neutral.dark;
  // @ts-ignore
  const medium = palette.neutral.medium;
  // @ts-ignore
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
      return null;
    }

    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;

    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="60px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
    </WidgetWrapper>;
  };
  return <div></div>;
};

export default UserWidget;
