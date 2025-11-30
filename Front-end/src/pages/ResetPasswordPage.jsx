import Formlayout from "../feature/Form/FormLayout";
// import LoginForm from "../feature/Form/LoginForm";
import ResetPassForm from "../feature/Form/ResetPasswordForm";
import DivMotion from "../ui/DivMotion";

function ResetPassPage() {
  return (
    <DivMotion>
      <Formlayout FormTitle={"Reset Password"}>
        <ResetPassForm />
      </Formlayout>
    </DivMotion>
  );
}

export default ResetPassPage;
