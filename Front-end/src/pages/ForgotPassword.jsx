import ForgotPaasForm from "../feature/Form/ForgotPasswordForm";
import Formlayout from "../feature/Form/FormLayout";
// import LoginForm from "../feature/Form/LoginForm";
import DivMotion from "../ui/DivMotion";

function ForgotPass() {
  return (
    <DivMotion>
      <Formlayout FormTitle={"Forgot Password"}>
        <ForgotPaasForm></ForgotPaasForm>
      </Formlayout>
    </DivMotion>
  );
}

//test Mail : 444@gmail.com

export default ForgotPass;
