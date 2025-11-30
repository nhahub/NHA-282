import { MdLock } from "react-icons/md";
import FormInput from "./FormInput.jsx";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import { LoginSchema } from "../../utils/LoginSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../ui/FormError.jsx";
// import { logInUser } from "../../services/apiUser.js";
// import { logIn } from "../../services/Auth.js";
import toast from "react-hot-toast";
// import { ForgotPasswordSchema } from "../../utils/ForgotPasswordSchema.js";
import { ResetPassSchema } from "../../utils/ResetPassSchema.js";
import { ResetPassAPI } from "../../services/apiResetPassword.js";
// import { ForgotPassAPI } from "../../services/apiResetPassword.js";

const onResetPassSubmit = async (data, token) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await ResetPassAPI(data, token);
    console.log("data is sent to backend", res);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

function ResetPassForm() {
  //   const nav = useNavigate();
  // handleSubmit , register , formState: {error , isSubmitting}
  const { token } = useParams();

  const ResetPassHook = useForm({
    resolver: zodResolver(ResetPassSchema),
  });
  return (
    <form
      className="space-y-4 md:space-y-6 text-right"
      onSubmit={ResetPassHook.handleSubmit(async (data) => {
        console.log(token);
        const res = await onResetPassSubmit(data, token);

        if (res.status === "success") {
          ResetPassHook.reset();
          //   nav(`/`);
          //   logIn(res.user._id, res.token, res.user.name);
          toast.success(res.message);
        }
      })}
    >
      {/* Email input */}
      {/* password field */}
      <FormInput
        type={"password"}
        name={"password"}
        label={"Password"}
        id={"SignUpPassword"}
        icon={<MdLock></MdLock>}
        register={ResetPassHook.register}
      ></FormInput>
      <FormError
        msg={ResetPassHook.formState?.errors?.password?.message}
      ></FormError>

      {/* confirm Password */}
      <FormInput
        type={"password"}
        name={"confirmPassword"}
        label={"Confirm Password"}
        id={"SignUpConfirmPassword"}
        icon={<MdLock></MdLock>}
        register={ResetPassHook.register}
      ></FormInput>
      <FormError
        msg={ResetPassHook.formState?.errors?.confirmPassword?.message}
      ></FormError>
      <FormInput
        type={"submit"}
        value={ResetPassHook.formState.isSubmitting ? "Loading..." : "Continue"}
      ></FormInput>

      <p className="text-sm font-light text-gray-500 text-left">
        Did you remmeber the Password?{" "}
        <Link to={"/login"}>
          <span className="font-medium text-gray-600 hover:underline hover:text-black ">
            login
          </span>
        </Link>
      </p>
      {/* <DevTool control={ForgotPassHook.control} /> */}
    </form>
  );
}

export default ResetPassForm;
