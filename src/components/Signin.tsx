import { useReducer, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useVisibleHook from "../customhooks/useVisibleHook";
import { AuthProps, ActionTypes } from "../model/types";
import { formReducer } from "../reducer/formReducer";
import { setCredentials, setUserToken } from "../redux/features/usersSlice";
import { useAppDispatch } from "../redux/hooks";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../redux/services/api";
import { useGetAllUsersQuery } from "../redux/services/postApi";
import Input from "./Input";
import Label from "./Label";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Signin({ userExist }: AuthProps) {
  const initialState = {
    email: "",
    password: "",
  };
  const [state, dispatch]: any = useReducer<any>(formReducer, initialState);
  const [error, setError] = useState<string>("");
  const { visible, handleVisible } = useVisibleHook();
  const { data, isLoading, isFetching } = useGetAllUsersQuery(null, {
    refetchOnFocus: false,
  });

  const navigate = useNavigate();
  const [
    loginUser,
    {
      isLoading: isLoadingUser,
      isSuccess: isSuccessLogin,
      data: loginResponse,
    },
  ] = useLoginUserMutation();
  const [
    registerUser,
    { isLoading: isRegisteringUser, isSuccess: isSuccessRegister },
  ] = useRegisterUserMutation();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    dispatch({
      type: ActionTypes.siginText,
      payload: { key: [name], value: value },
    });
  };
  const dispatchUser = useAppDispatch();
  const { email, password } = state;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!password || !email) {
      setError("Please submit all details");
      return;
    }

    const payload = { email, password };
    if (!userExist) {
      const response: any = await registerUser(payload);
      if (response.data) {
        toast.info("Registration successful");
        dispatchUser(setCredentials(response.data.data));
        navigate("/signin");
      }
      if (response?.error) {
        setError(response?.error?.data?.message);
      }
    } else {
      const response: any = await loginUser(payload);
      if (response.data) {
        toast.info("Login successful");
        console.log(response.data, "login");
        dispatchUser(setUserToken(response.data.token));
        navigate("/");
      }
      if (response?.error) {
        setError(response?.error?.data?.message);
      }
    }
    // if(data && data.length > 0){
    //   const currentLoggedInUser = data?.find(user => user.email === email)
    //   if(currentLoggedInUser){
    //     dispatchUser(setCredentials(currentLoggedInUser))
    //     router.push('/');
    //   }else{
    //     setError('Please submit correct credentials')
    //   }
    // }
  };
  useEffect(() => {
    if (isSuccessRegister) {
      toast.info("User registered successfully");
    }
    if (isSuccessLogin) {
      toast.info("User logged in successfully");
    }
  }, [isSuccessRegister, isSuccessLogin]);

  return (
    <div className="w-full md:w-[50%] shadow-lg rounded-2xl flex m-auto bg-white px-8 py-3 items-center justify-center h-auto mt-12">
      <form className="w-full" onSubmit={handleSubmit}>
        <p className="text-red-500">{error}</p>
        <div className="my-4">
          <Label>Email</Label>
          <Input
            placeholder="John Doe"
            name="email"
            onChange={handleInputChange}
            type="text"
            value={email || ""}
          />
        </div>
        <div className="my-4">
          <Label>Password</Label>
          <div className="relative">
            <Input
              name="password"
              onChange={handleInputChange}
              type={visible ? "text" : "password"}
              value={password || ""}
            />
            <div onClick={handleVisible} className="absolute right-2 top-3">
              {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
        </div>

        <div className="my-4">
          <button>{userExist ? "Sign in" : "SIgn up"}</button>
        </div>
        <div className="my-4">
          {userExist ? (
            <p>
              Don't have an account yet? <Link to={"/"}>Sign up</Link>
            </p>
          ) : (
            <p>
              Have an account? <Link to={"/signin"}>Sign in</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
