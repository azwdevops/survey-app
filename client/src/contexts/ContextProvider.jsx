import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: "",
  surveys: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
  questionTypes: [],
  toast: { message: null, show: false },
  setToast: () => {},
});

const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [surveys, setSurveys] = useState([]);
  const [toast, setToast] = useState({ message: "", show: false });
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);

  const handleSetUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    setUserToken(token);
  };

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        handleSetUserToken,
        surveys,
        questionTypes,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
