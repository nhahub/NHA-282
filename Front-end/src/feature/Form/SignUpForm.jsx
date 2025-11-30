import { MdEmail, MdLock } from "react-icons/md";
import FormInput from "./FormInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../ui/FormError.jsx";
import { SignUpSchema } from "../../utils/SignUpSchema.js";
import { registerUser } from "../../services/apiUser.js";
import { logIn } from "../../services/Auth.js";
import toast from "react-hot-toast";

const onSignUpSubmit = async (data) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await registerUser(data);
    console.log("data sent to backend", res);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

function SignUpForm() {
  const SignUpHook = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  const nav = useNavigate();
  return (
    <form
      className="space-y-4 md:space-y-6 text-right"
      onSubmit={SignUpHook.handleSubmit(async (data) => {
        const res = await onSignUpSubmit(data);
        if (res.status === "success") {
          SignUpHook.reset();
          nav("/");
          logIn(res.user._id, res.token, res.user.name);
          toast.success(`signed up successfuly`);
        }
      })}
    >
      {/* User Name */}
      <FormInput
        type={"text"}
        name={"name"}
        id={"SignUpUsername"}
        label={"username"}
        icon={<FaUser></FaUser>}
        register={SignUpHook.register}
      ></FormInput>
      <FormError
        msg={SignUpHook.formState?.errors?.username?.message}
      ></FormError>
      {/* Email input */}
      <FormInput
        type={"email"}
        name={"email"}
        id={"SignUpEmail"}
        label={"Email address"}
        icon={<MdEmail></MdEmail>}
        register={SignUpHook.register}
      ></FormInput>
      <FormError msg={SignUpHook.formState?.errors?.email?.message}></FormError>

      {/* Phone number */}
      <FormInput
        type={"tel"}
        name={"phoneNumber"}
        id={"SignUpPhone"}
        label={"Phone number"}
        icon={<BsFillTelephoneFill></BsFillTelephoneFill>}
        register={SignUpHook.register}
      ></FormInput>
      <FormError
        msg={SignUpHook.formState?.errors?.phoneNumber?.message}
      ></FormError>

      {/* password field */}
      <FormInput
        type={"password"}
        name={"password"}
        label={"Password"}
        id={"SignUpPassword"}
        icon={<MdLock></MdLock>}
        register={SignUpHook.register}
      ></FormInput>
      <FormError
        msg={SignUpHook.formState?.errors?.password?.message}
      ></FormError>

      {/* confirm Password */}
      <FormInput
        type={"password"}
        name={"confirmPassword"}
        label={"Confirm Password"}
        id={"SignUpConfirmPassword"}
        icon={<MdLock></MdLock>}
        register={SignUpHook.register}
      ></FormInput>
      <FormError
        msg={SignUpHook.formState?.errors?.confirmPassword?.message}
      ></FormError>

      <FormInput
        type={"submit"}
        value={
          SignUpHook.formState.isSubmitting ? "Loading..." : "Create Account"
        }
      ></FormInput>
      <div className="text-center">
        <pre>
          <span className="font-bold text-lg">OR</span> <br />
          Sing up with
        </pre>
      </div>
      <div className="flex justify-around">
        <button className="px-4 py-2 border grayscale flex gap-2 border-slate-200 rounded-lg text-gray-500  hover:border-slate-400  hover:text-gray-900  hover:grayscale-0  hover:shadow transition duration-200">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Google</span>
        </button>

        <button className="px-4 py-2 grayscale border flex gap-2 border-slate-200 rounded-lg text-gray-500  hover:border-slate-400  hover:text-gray-900 hover:grayscale-0  hover:shadow transition duration-200">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Facebook</span>
        </button>
      </div>
      <p className="text-sm font-light text-gray-500 text-left">
        Already have an account ?{" "}
        <Link to={"/login"}>
          <span className="font-medium text-gray-600 hover:underline hover:text-black ">
            Login
          </span>
        </Link>
      </p>
      {/* <DevTool control={SignUpHook.control} /> */}
    </form>
  );
}

export default SignUpForm;
