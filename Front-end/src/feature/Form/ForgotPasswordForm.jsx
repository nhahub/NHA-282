import { MdEmail } from "react-icons/md";
import FormInput from "./FormInput.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import { LoginSchema } from "../../utils/LoginSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../ui/FormError.jsx";
// import { logInUser } from "../../services/apiUser.js";
// import { logIn } from "../../services/Auth.js";
import toast from "react-hot-toast";
import { ForgotPasswordSchema } from "../../utils/ForgotPasswordSchema.js";
import { ForgotPassAPI } from "../../services/apiResetPassword.js";

const onForgotPassSubmit = async (data) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await ForgotPassAPI(data);
    console.log("data is sent to backend", res);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

function ForgotPaasForm() {
  //   const nav = useNavigate();
  // handleSubmit , register , formState: {error , isSubmitting}
  const ForgotPassHook = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  return (
    <form
      className="space-y-4 md:space-y-6 text-right"
      onSubmit={ForgotPassHook.handleSubmit(async (data) => {
        const res = await onForgotPassSubmit(data);

        if (res.status === "success") {
          ForgotPassHook.reset();
          //   nav(`/`);
          //   logIn(res.user._id, res.token, res.user.name);
          toast.success(res.data.message);
        }
      })}
    >
      <div className="text-left py-5">
        Enter email address and a link to reset your password will be sent to
        you.
      </div>
      {/* Email input */}
      <FormInput
        type={"email"}
        name={"email"}
        id={"LoginEmail"}
        label={"Email address"}
        icon={<MdEmail></MdEmail>}
        register={ForgotPassHook.register}
        required={true}
      ></FormInput>
      <FormError msg={ForgotPassHook.formState?.errors?.email?.message} />

      <FormInput
        type={"submit"}
        value={
          ForgotPassHook.formState.isSubmitting ? "Loading..." : "Continue"
        }
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

export default ForgotPaasForm;
