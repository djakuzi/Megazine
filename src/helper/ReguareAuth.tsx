import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { RootState } from "../redux/store";



export default function ReguareAuth({children}:{children: ReactNode}){

    const jwt = useSelector( (s:RootState) => s.user.token)

        if(!jwt){
            return <Navigate to="/Megazine/auth/login" replace></Navigate>
    }
    

    return <>{children}</>
}