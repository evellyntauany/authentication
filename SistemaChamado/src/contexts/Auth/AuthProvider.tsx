import { useEffect, useState } from 'react'
import { User, UserLogin, UserRegister } from '../../types/User'
import { AuthContext } from './AuthContext'
import { setupAPIClient } from '../../hooks/useApi'


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User>()
    const api = setupAPIClient();
    const TOKEN_KEY = "@token";

   const isAuthenticaded =() => {
    if(localStorage.getItem(TOKEN_KEY) !== null){
       return true;
    }
      return false;
  }

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser); //Para string
        setUser(foundUser);
      }
    }, [setUser]);

  async function register({ name, email, password }: UserRegister) {
      await api.post('/cadastrar', {
        name,
        email,
        password,
      }).then(response => {
        const {  name, email } = response.data;
        const json = JSON.stringify(response.data); //para json
        localStorage.setItem('user', json) //seta no meu localStorage       
        setUser({
        name,
        email
      })

      }) .catch(error => {
        alert(error.response.data.message); // Imprime a mensagem de erro retornada pelo servidor
        return false
      });
  }

  const logando = async ({ email, password }: UserLogin) => {
    await api.post('/signin', 
    {
        email,password
    })
    .then(response => {
        console.log(response.data)
        const {  name, email } = response.data;
        const json = JSON.stringify(response.data);
        localStorage.setItem('user', json)
        setUser({
        name,
        email
      })
       }) .catch(error => {
         alert(error.response.data.message); // Imprime a mensagem de erro retornada pelo servidor
         return false
       });
  }

  const signout = async () => {
    console.log('signout está sendo executada.')
    setUser(undefined);
    localStorage.clear();

  }


  return (
    <AuthContext.Provider
      value={{ user, logando, signout, register,isAuthenticaded }}
    >
      {children}
    </AuthContext.Provider>
  )
}
