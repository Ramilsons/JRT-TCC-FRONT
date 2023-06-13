
import { View, StyleSheet, Pressable, Text, StatusBar } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';

import globalStyle from '../../global/styles';

import DelimiterTop from '../components/DelimiterTop';
import TitleAuthentication from '../components/TitleAuthentication';
import LinkAuthentication from '../components/LinkAuthentication';
import InputCPF from '../components/InputCPF';
import InputPassword from '../components/InputPassword';
import InputBirthDate from '../components/InputBirthDate';
import InputPhone from '../components/InputPhone';
import InputName from '../components/InputName';
import ButtonPrimary from '../components/ButtonPrimary';
import MessageFeedback from '../components/MessageFeedback';

import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';
import mime from 'mime';

// Utils
import unmaskPhone from '../utils/unmaskPhone';
import unmaskCpf from '../utils/unmaskCpf';

export default function NewUser() {
    const { signIn } = useContext(IsLogged);

    const [isLoad, setIsLoad] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formattedDate, setFormattedDate] = useState([]);
    const [finallyDate, setFinallyDate] = useState([]);
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    
    // Image Picker
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    useEffect(() => {
        let dateSeparate = birthDate.split("/");
        setFormattedDate(dateSeparate);
    }, [birthDate]);

    useEffect(() => {
        let finallyDateOrganize = new Date(formattedDate[2], formattedDate[1]-1, formattedDate[0], 0, 0, 0);
        setFinallyDate(finallyDateOrganize);
    }, [formattedDate])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })

        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    };

    function errorMessageConfig() {
        setTypeMessage('error');
        setMessage('Preencha corretamente os campos');
        setMessageVisible(true);
    
        setTimeout(() => setMessageVisible(false), 4000);   
    }

    async function sendData(){
        if(confirmPassword === password){
            let formData = new FormData();
            formData.append('name', name)
            formData.append('password', password)
            formData.append('cpf', unmaskCpf(cpf))
            // formData.append('birthDate', finallyDate)
            formData.append('phone', unmaskPhone(phone))
            if(image.length > 0){
                formData.append('fileData', JSON.parse(
                            JSON.stringify({
                            uri : image,
                            type: mime.getType(image),
                            name: 'profile'
                        })
                    )
                );
            }

            try {
                const result = await axios.post('https://jrt-medicamentos.onrender.com/users', formData, {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data'
                    }
                })
              
                if(result.data.error){
                    console.log(formData);
                    console.log(mime.getType(image));
                    console.log('Houve um erro ao tentar se registrar. '+e);
                    console.log(result.data.error);
                    errorMessageConfig();
                }else{
                    signIn(cpf, password);
                    setIsLoad(true);
                }
            } catch(e) {    
                errorMessageConfig();
            }
        }
    }

    if(hasGalleryPermission === false){
        return <Text>Sem acesso a galeria</Text>
    }

    return (
        <View>
            <DelimiterTop />
            <TitleAuthentication customTitle="Criar uma conta" />
            <View>
                <InputName valueToSet={setName} variable={name}  />
                <InputCPF valueToSet={setCpf} variable={cpf}  />
                <InputPhone valueToSet={setPhone} variable={phone}  />
                <InputBirthDate icon={true} placeholder={'Digite sua data de nascimento'} valueToSet={setBirthDate} variable={birthDate}  />
                <InputPassword valueToSet={setPassword} variable={password}  />
                <InputPassword valueToSet={setConfirmPassword} customPlaceholder="Digite a senha novamente" variable={confirmPassword}  />
                <Pressable onPress={pickImage}>
                    <View style={{ backgroundColor: 'transparent', borderRadius: 5, borderWidth: 2, borderColor: globalStyle.colorSecondary, color: globalStyle.colorSecondary}}>
                        <Text style={{textAlign: 'center', fontFamily: globalStyle.mavenBold, lineHeight: 40 ,height: 40, fontSize: 15, color: globalStyle.colorSecondary}}>Escolher uma foto</Text>
                    </View>
                </Pressable>
                <Text style={image.length > 0 ? styles.textName : styles.hidden }>Foto selecionada!</Text>
            </View>
            <ButtonPrimary cta="Criar conta" callBackFunction={sendData} stateIsLoad={isLoad} />
            <LinkAuthentication customText="Já tem uma conta? Clique aqui." targetScreen="Login" />
            <MessageFeedback type={typeMessage} message={message} visible={messageVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: globalStyle.colorPrimary,
        color: globalStyle.colorPrimary
    },

    textName: {
        height: 20,
        marginTop: 5,
        color: globalStyle.grayLink,
        maxWidth: globalStyle.maxWidth,
        fontFamily: globalStyle.mavenRegular,
        textAlign: 'center'
    },

    hidden: {
        marginTop: 5,
        height: 20,
        opacity: 0,
    }
})