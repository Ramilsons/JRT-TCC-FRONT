import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axios from 'axios';

export const IsLogged = createContext({isLogged: false, name: '', id: ''});

function IsLoggedProvider({children}){
    const [userInfos, setUserInfos] = useState({});
    const navigation = useNavigation();

    function signIn(cpf, password){
        cpf = cpf.replace('-', '');
        cpf = cpf.replace('.', '');
        cpf = cpf.replace('.', '');
    
       
        if(cpf !== ''){
            axios.get(`https://jrt-medicamentos.onrender.com/users/cpf/${cpf}`)
                .then(response => {
                    console.log(response.data[0]);

                    if(password == response.data[0].password){
                        setUserInfos({
                            id: response.data[0]._id,
                            name: response.data[0].name,
                            cpf: response.data[0].cpf,
                            phone: response.data[0].phone,
                            isLogged: true
                        })

                        navigation.navigate("Meus Medicamentos");

                        
                    }else{
                        console.log('CPF ou senha não encontrado');
                    }

                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    return(
        <IsLogged.Provider value={{userInfos, signIn}}>
            {children}
        </IsLogged.Provider>
    )
}

export default IsLoggedProvider;