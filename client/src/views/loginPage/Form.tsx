import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import axios from "axios";
import { BASE_URL } from "../../helpers/consts";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File;
};
type LoginValues = {
  email: string;
  password: string;
};

const initialValuesRegister: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: new File([], ""),
};

const initialValuesLogin: LoginValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [loading, setLoading] = useState(false);

  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      // @ts-ignore
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSubmitProps.resetForm();

      if (response.data) {
        setPageType("login");
      }
      setLoading(false);
      toast.success(" Hey! You are registered and amazing!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: <InsertEmoticonIcon />,
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

  const login = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, values);
      if (response.data) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
        setLoading(false);
        navigate("/home");
        toast.success(" Hey! You are logged in", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: <InsertEmoticonIcon />,
          style: {
            backgroundColor: "rgba(250,250,250,0.53)",
            borderRadius: "8px",
            boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (
    values: RegisterValues,
    onSubmitProps: any
  ) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  // @ts-ignore

  return (
    <Formik
      onSubmit={handleFormSubmit}
      // @ts-ignore
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // @ts-ignore
      validationSchema={isLogin ? loginSchema : registerSchema}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  // @ts-ignore
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    // @ts-ignore
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles: File[]) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here. Max size 5MB</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/*BUTTONS*/}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                display: "flex",
                gap: "10px",
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                // @ts-ignore
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
              {loading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress sx={{ color: "#706d6d" }} size={20} />
                </Box>
              )}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
