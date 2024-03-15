import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { user } = useApp();
  if (user == null) {
    return <Login />;
  } else {
    return <Dashboard />;
  }
}
