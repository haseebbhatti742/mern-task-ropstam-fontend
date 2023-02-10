import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required/ Must be 8 characters")
    .length(8),
});

export const CarSchema = Yup.object().shape({
  categoryId: Yup.string().required("Category is required"),
  registrationNumber: Yup.string().required("Registration Number is required"),
  make: Yup.string().required("Make Year is required"),
  model: Yup.number().min(1998).required("Model Year is required/ Min 1998"),
  color: Yup.string().required("Color is required"),
});
