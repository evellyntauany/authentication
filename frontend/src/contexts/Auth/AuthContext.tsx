import { createContext } from "react";
import { User, UserLogin, UserRegister } from "../../types/User";


export type AuthContextType = {
    user: User | undefined ;
    error: string | null;
    sucess: string | null;
    logando: (usuario:UserLogin)=> Promise<void>;
    signout:() =>void;
    register:(usuario:UserRegister)=>Promise<void>;
  
}


export const AuthContext = createContext<AuthContextType>(null!);