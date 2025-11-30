// import { FaMailBulk } from "react-icons/fa";
// import { FaVoicemail } from "react-icons/fa6";

import Formlayout from "../feature/Form/FormLayout";
import LoginForm from "../feature/Form/LoginForm";
import DivMotion from "../ui/DivMotion";

function Login() {
  return (
    <DivMotion>
      <Formlayout FormTitle={"Login"}>
        <LoginForm></LoginForm>
      </Formlayout>
    </DivMotion>
  );
}

export default Login;
