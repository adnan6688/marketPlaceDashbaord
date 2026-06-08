import { Navigate, useLocation } from "react-router";
import AuthHook from "../Hooks/AuthHook";
import { Loader } from "lucide-react";
import Toast from "../components/Toast";


type Props = {
  children: React.ReactNode;
};

export default function PrivetRoutes({ children }: Props) {
  const { loading, user } = AuthHook()
  const location = useLocation();



  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  if (user.role !== "ADMIN") {
    Toast({ type: 'error', message: 'You are not allowed!' })
    return <Navigate to="/" replace />;
  }
 
  return children;
}