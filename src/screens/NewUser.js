
import { View, Button, StyleSheet, Text } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';

import globalStyle from '../../global/styles';

import TitleAuthentication from '../components/TitleAuthentication';
import LinkAuthentication from '../components/LinkAuthentication';
import InputCPF from '../components/InputCPF';
import InputPassword from '../components/InputPassword';
import InputBirthDate from '../components/InputBirthDate';
import InputPhone from '../components/InputPhone';
import InputName from '../components/InputName';
import ButtonPrimary from '../components/ButtonPrimary';
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

        console.log(result.assets)

        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    };

    async function sendData(){
        console.log(finallyDate);

        if(confirmPassword ===  password){
            let formData = new FormData();
            formData.append('name', name)
            formData.append('password', password)
            formData.append('cpf', unmaskCpf(cpf))
            formData.append('birthDate', finallyDate)
            formData.append('phone', unmaskPhone(phone))
            formData.append('fileData', JSON.parse(
                        JSON.stringify({
                        uri : image,
                        type: mime.getType(image),
                        name: 'profile'
                    })
                )
            );

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
            }else{
                signIn(cpf, password);
                setIsLoad(true);
            }
        }
    }

    if(hasGalleryPermission === false){
        return <Text>Sem acesso a galeria</Text>
    }

    return (
        <View>
            <TitleAuthentication customTitle="Criar uma conta" />
            <View>
                <InputName valueToSet={setName} variable={name}  />
                <InputCPF valueToSet={setCpf} variable={cpf}  />
                <InputPhone valueToSet={setPhone} variable={phone}  />
                <InputBirthDate valueToSet={setBirthDate} variable={birthDate}  />
                <InputPassword valueToSet={setPassword} variable={password}  />
                <InputPassword valueToSet={setConfirmPassword} customPlaceholder="Digite a senha novamente" variable={confirmPassword}  />
                <Button style={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: globalStyle.colorPrimary, color: globalStyle.colorPrimary}} title="Escolher uma foto" onPress={pickImage} />
                <Text  style={image.length > 0 ? styles.textName : styles.hidden }>Você já selecionou uma foto.</Text>
            </View>
            <ButtonPrimary cta="Entrar" callBackFunction={sendData} stateIsLoad={isLoad} />
            <LinkAuthentication customText="Já tem uma conta? Clique aqui." targetScreen="Login" />
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