import { View, Image } from 'react-native';
import globalStyle from '../global/styles';
import TitleAuthentication from '../components/TitleAuthentication';
import InputCPF from '../components/InputCPF';
import InputPassword from '../components/InputPassword';
import ButtonPrimary from '../components/ButtonPrimary';

import { useState, useContext } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';

export default function Login(){
    const [cpf, setCpf] = useState('25475559139');
    const [password, setPassword] = useState('123456789');
    const [isLoad, setIsLoad] = useState(false);

    const { signIn } = useContext(IsLogged);

    function sendData(){
       signIn(cpf, password);
       setIsLoad(true);
    }

    return(
        <View>
            <Image
                source={require('../assets/images/login-banner.png')}
                style={{width: globalStyle.maxWidth, height: 230}}
            />
            <TitleAuthentication customTitle="Entrar na conta" />
            <InputCPF variable={cpf} valueToSet={setCpf} />
            <InputPassword  variable={password} valueToSet={setPassword} />
            <ButtonPrimary cta="Entrar" callBackFunction={sendData} stateIsLoad={isLoad} />
        </View>
    )
}