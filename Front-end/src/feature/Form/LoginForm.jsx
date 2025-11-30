import { MdEmail, MdLock } from "react-icons/md";
import FormInput from "./FormInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { LoginSchema } from "../../utils/LoginSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../ui/FormError.jsx";
import { logInUser } from "../../services/apiUser.js";
import { logIn } from "../../services/Auth.js";
import toast from "react-hot-toast";

const onLoginSubmit = async (data) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await logInUser(data);
    console.log("data sent to backend", res);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

function LoginForm() {
  const nav = useNavigate();
  // handleSubmit , register , formState: {error , isSubmitting}
  const LoginHook = useForm({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <form
      className="space-y-4 md:space-y-6 text-right"
      onSubmit={LoginHook.handleSubmit(async (data) => {
        const res = await onLoginSubmit(data);

        if (res.status === "success") {
          LoginHook.reset();
          nav(`/`);
          logIn(res.user._id, res.token, res.user.name);
          toast.success(`logged in successfuly`);
        }
      })}
    >
      {/* Email input */}
      <FormInput
        type={"email"}
        name={"email"}
        id={"LoginEmail"}
        label={"Email address"}
        icon={<MdEmail></MdEmail>}
        register={LoginHook.register}
        required={true}
      ></FormInput>
      <FormError msg={LoginHook.formState?.errors?.email?.message} />
      {/* password field */}
      <FormInput
        type={"password"}
        name={"password"}
        label={"Password"}
        id={"LoginPassword"}
        icon={<MdLock></MdLock>}
        register={LoginHook.register}
        required={true}
      ></FormInput>
      <span
        onClick={() => nav("/forgotPass")}
        className=" w-full cursor-pointer pr-5 items-center mt-0 text-sm font-medium text-gray-500 hover:underline hover:text-black"
      >
        Forgot password?
      </span>
      <FormError
        msg={LoginHook.formState?.errors.password?.message}
      ></FormError>

      <FormInput
        type={"submit"}
        value={LoginHook.formState.isSubmitting ? "Loading..." : "login"}
      ></FormInput>

      <p className="text-sm font-light text-gray-500 text-left">
        Don’t have an account yet?{" "}
        <Link to={"/signup"}>
          <span className="font-medium text-gray-600 hover:underline hover:text-black ">
            Sign up
          </span>
        </Link>
      </p>
      {/* <DevTool control={LoginHook.control} /> */}
    </form>
  );
}

export default LoginForm;
