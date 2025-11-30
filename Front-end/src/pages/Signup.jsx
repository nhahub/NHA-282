import Formlayout from "../feature/Form/FormLayout";
import SignUpForm from "../feature/Form/SignUpForm";
import DivMotion from "../ui/DivMotion";

function Signup() {
  return (
    <DivMotion>
      <Formlayout FormTitle={"Create Account"}>
        <SignUpForm></SignUpForm>
      </Formlayout>
    </DivMotion>
  );
}

export default Signup;
