import { View, Button } from 'react-native';

import { useContext, useState } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';

import TitleAuthentication from '../components/TitleAuthentication';
import LinkAuthentication from '../components/linkAuthentication';
import InputCPF from '../components/InputCPF';
import InputPassword from '../components/InputPassword';
import InputBirthDate from '../components/InputBirthDate';
import InputPhone from '../components/InputPhone';
import InputName from '../components/InputName';
import ButtonPrimary from '../components/ButtonPrimary';
import { launchImageLibrary } from 'react-native-image-picker';

export default function NewUser() {
    const { signIn } = useContext(IsLogged);

    const [isLoad, setIsLoad] = useState(false);
    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            setPhoto(response);
          }
        });
    };

    function sendData(){
       signIn(cpf, password);
       setIsLoad(true);
    }

    return (
        <View>
            <TitleAuthentication customTitle="Criar uma conta" />
            <View>
                <InputName />
                <InputCPF />
                <InputPhone />
                <InputBirthDate />
                <InputPassword />
                <InputPassword customPlaceholder="Digite a senha novamente" />
                <Button title="Escolher uma foto" onPress={handleChoosePhoto} />
            </View>
            <ButtonPrimary cta="Entrar" callBackFunction={sendData} stateIsLoad={isLoad} />
            <LinkAuthentication customText="Já tem uma conta? Clique aqui." targetScreen="Login" />
        </View>
    )
}