import Form from "./Form";
import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // @ts-ignore
  return (
    <Box>
      {/*@ts-ignore*/}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          freeZone
        </Typography>
      </Box>
      {/*@ts-ignore*/}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to freeZone. This is your primary zone!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
