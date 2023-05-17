import { View, Image, StatusBar } from 'react-native';
import globalStyle from './../../global/styles/index';
import TitleAuthentication from '../components/TitleAuthentication';
import InputCPF from '../components/InputCPF';
import InputPassword from '../components/InputPassword';
import ButtonPrimary from '../components/ButtonPrimary';
import LinkAuthentication from '../components/LinkAuthentication';
import DelimiterTop from '../components/DelimiterTop';

import { useState, useContext, useEffect } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';

import { Link, useNavigation } from "@react-navigation/native";

export default function Login(){
    const [cpf, setCpf] = useState('25475559139');
    const [password, setPassword] = useState('123456789');
    const [isLoad, setIsLoad] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoad(false);
        })
    }, [navigation])
    
    const { signIn } = useContext(IsLogged);

    function sendData(){
       signIn(cpf, password);
       setIsLoad(true);
    }

    return(
        <View>
            <DelimiterTop />
            <Image
                source={require('../../assets/images/login-banner.png')}
                style={{width: globalStyle.maxWidth, height: 230}}
            />
            <TitleAuthentication customTitle="Entrar na conta" />
            <InputCPF variable={cpf} valueToSet={setCpf} />
            <InputPassword  variable={password} valueToSet={setPassword} />
            <ButtonPrimary cta="Entrar" callBackFunction={sendData} stateIsLoad={isLoad} />
            <LinkAuthentication customText="Não tem uma conta? Clique aqui." targetScreen="Novo Usuario" />
        </View>
    )
}