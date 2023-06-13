import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axios from 'axios';

export const IsLogged = createContext({isLogged: false, name: '', id: ''});

function IsLoggedProvider({children}){
    const [userInfos, setUserInfos] = useState({});
    const navigation = useNavigation();

    function signIn(cpf, password, setMessageVisible, setTypeMessage, setMessage, setIsLoad){
        cpf = cpf.replace('-', '');
        cpf = cpf.replace('.', '');
        cpf = cpf.replace('.', '');
    
        let res;
        if(cpf !== ''){
            axios.get(`https://jrt-medicamentos.onrender.com/users/cpf/${cpf}`)
                .then(response => {
                    if(response.data[0] && password == response.data[0].password){
                        
                        let imagePath = '';
                        if(response.data[0].imagePath){
                            imagePath = 'https://jrt-medicamentos.onrender.com/uploads/'+response.data[0].imagePath;
                        }
                        setUserInfos({
                            id: response.data[0]._id,
                            name: response.data[0].name,
                            cpf: response.data[0].cpf,
                            phone: response.data[0].phone,
                            imageProfilePath: imagePath,
                            isLogged: true
                        })

                        navigation.navigate("Home");
                    }else{
                        console.log('CPF ou senha não encontrado');

                        setMessageVisible(true);
                        setTypeMessage('error');
                        setMessage('CPF ou senha não encontrado');
                        setIsLoad(false);

                        setTimeout(() => setMessageVisible(false), 4000);
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function uploadInfos(cpf){
        console.log('executou upload de infos')
        cpf = cpf.replace('-', '');
        cpf = cpf.replace('.', '');
        cpf = cpf.replace('.', '');
    
        if(cpf !== ''){
            axios.get(`https://jrt-medicamentos.onrender.com/users/cpf/${cpf}`)
                .then(response => {   
                    console.log(response);
                    let imagePath = '';
                    if(response.data[0].imagePath){
                        imagePath = 'https://jrt-medicamentos.onrender.com/uploads/'+response.data[0].imagePath;
                    }
                    setUserInfos({
                        id: response.data[0]._id,
                        name: response.data[0].name,
                        cpf: response.data[0].cpf,
                        phone: response.data[0].phone,
                        imageProfilePath: imagePath,
                        isLogged: true
                    })

                    navigation.navigate("Perfil");
                })
                .catch(e => {
                    console.log(e);
                })
        } 
    }

    return(
        <IsLogged.Provider value={{userInfos, signIn, uploadInfos}}>
            {children}
        </IsLogged.Provider>
    )
}

export default IsLoggedProvider;