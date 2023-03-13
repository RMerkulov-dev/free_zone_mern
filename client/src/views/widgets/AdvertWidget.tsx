import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { BASE_URL } from "../../helpers/consts";

const AdvertWidget = () => {
  const { palette } = useTheme();
  // @ts-ignore
  const dark = palette.neutral.dark;
  // @ts-ignore
  const main = palette.neutral.main;
  // @ts-ignore
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${BASE_URL}/assets/nike-logo.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Nike</Typography>
        <Typography color={medium}>nike.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your sport is our goal!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
