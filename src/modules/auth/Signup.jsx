import React, { useEffect } from "react";
import { useMemo } from "react";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthErr,
  selectAuthStatus,
  userSignup,
} from "../../features/auth/authSlice";
import BtnLoading from "../../components/BtnLoading";

const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const err = useSelector(selectAuthErr);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().min(3).max(255).required(),
      email: yup.string().email().required(),
      name: yup.string().min(3).max(255).required(),
      wallet: yup.string().min(3).max(255).required(),
      password: yup.string().min(5).max(255).required(),
      confirmPass: yup
        .string()
        .min(5)
        .max(255)
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    });
  }, []);
  // form
  const { register, handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      username: "",
      email: "",
      name: "",
      wallet: "",
      password: "",
      confirmPass: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const formValues = watch();

  const { errors } = useFormState({ control });

  const handleFormSubmit = () => {
    dispatch(userSignup(formValues));
  };

  useEffect(() => {
    if (err) setError("email", { message: err });
  }, [err]);

  return (
    <div>
      <h2 className="form-auth-h2">
        Create an account for tracking your app api-call activities.
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="loginForm">
        <div>
          <input
            placeholder="Username*"
            className="formInput"
            style={{
              border: errors.username && "2px solid red",
            }}
            {...register("username")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.username?.message}
          </span>
        </div>
        <div>
          <input
            placeholder="Email*"
            className="formInput"
            style={{
              border: errors.email && "2px solid red",
            }}
            {...register("email")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.email?.message}
          </span>
        </div>
        <div>
          <input
            placeholder="Name*"
            className="formInput"
            style={{
              border: errors.name && "2px solid red",
            }}
            {...register("name")}
          />
          <br />
          <span className="form-auth-error-input">{errors?.name?.message}</span>
        </div>
        <div>
          <input
            placeholder="WalletId*"
            className="formInput"
            style={{
              border: errors.wallet && "2px solid red",
            }}
            {...register("wallet")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.wallet?.message}
          </span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password*"
            className="formInput"
            style={{
              border: errors.password && "2px solid red",
            }}
            {...register("password")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.password?.message}
          </span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password*"
            className="formInput"
            style={{
              border: errors.confirmPass && "2px solid red",
            }}
            {...register("confirmPass")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.confirmPass?.message}
          </span>
        </div>

        <br />
        <div className="form-auth-loading-btn">
          <BtnLoading
            type="submit"
            title="Create Account"
            variant="contained"
            loading={status === "loading"}
            disabled={
              !formValues.email || !formValues.password || !formValues.username
            }
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
