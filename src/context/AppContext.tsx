import { authState, getAll } from "@/db/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type contextProps = {
  children: React.ReactNode;
};

interface ContextInterface {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  corchos: any;
  getCorchos: () => Promise<void>;
  currentCorcho: any | null;
  setCurrentCorcho: React.Dispatch<React.SetStateAction<any | null>>;
  setCorchos: React.Dispatch<React.SetStateAction<any | null>>;
}

const AppContext = createContext<ContextInterface>({} as ContextInterface);

const AppProvider = ({ children }: contextProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [currentCorcho, setCurrentCorcho] = useState<any | null>(null);

  useEffect(() => {
    authState((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getCorchos();
    }
  }, [user]);

  const [corchos, setCorchos] = useState<any[]>([]);
  const getCorchos = async () => {
    try {
      toast.loading("Cargando...");
      const data = await getAll("corchos");
      console.log(user);
      const userCorchos = data.filter((corcho: any) => {
        return corcho.userId === user.uid;
      });
      console.log(userCorchos);
      setCorchos(userCorchos as any);
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Error al cargar");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        corchos,
        getCorchos,
        currentCorcho,
        setCurrentCorcho,
        setCorchos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Something wrong have happended");
  }
  return context;
}

export { AppProvider, useApp };
