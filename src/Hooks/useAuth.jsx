import { useContext } from "react";
import { AllContext } from "../Components/Provider/Provider";

const useAuth = () => {
  const auth = useContext(AllContext);
  return auth;
};

export default useAuth;
