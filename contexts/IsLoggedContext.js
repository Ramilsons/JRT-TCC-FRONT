import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const IsLogged = createContext({isLogged: false, name: '', id: ''});

function IsLoggedProvider({children}){
    const [userInfos, setUserInfos] = useState({});
    const navigation = useNavigation();

    function signIn(cpf, password){
        console.log('caiu no context')
        if(cpf !== '' && password !== ''){
            setUserInfos({
                isLogged: true,
                name: 'Ramilson Dois da Silvaaa',
                id: '6373b0718eba0b12262c4d72'
            })

            navigation.navigate("Meus Medicamentos");
        }
    }

    return(
        <IsLogged.Provider value={{userInfos, signIn}}>
            {children}
        </IsLogged.Provider>
    )
}

export default IsLoggedProvider;