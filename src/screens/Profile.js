import { View, Text, Pressable, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

import editStyle from '../../global/styles/inputWithIcon';
import globalStyle from '../../global/styles';

import ButtonPrimary from '../components/ButtonPrimary';
import InputBirthDate from '../components/InputBirthDate';

import axios from 'axios';
import mime from 'mime';

import unmaskPhone from '../utils/unmaskPhone';

export default function Profile(){
    const { userInfos, uploadInfos } = useContext(IsLogged);
    const navigate = useNavigation();

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState('');
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [dayOfBirth, setDayOfBirth] = useState(0);
    const [monthOfBirth, seMonthOfBirth] = useState(0);
    const [yearOfBirth, setYearOfBirth] = useState(0);

    useEffect(() => {
            try {
                (async () => {  
                    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    setHasGalleryPermission(galleryStatus.status === 'granted');
                })();
            } catch(e) {
                throw e;
            }
        
    }, []);

    useEffect(() => {
            try {
                (async () => {
                    const result = await axios.get(`https://jrt-medicamentos.onrender.com/users/${userInfos.id}`)
                    setName(result.data.name);
                    setPhone(result.data.phone);
                    setPassword(result.data.password);
                    setCpf(result.data.cpf);
            
                    let newCompletionDate = formatDateBr(result.data.birthDate);
                    setBirthDate(newCompletionDate); 
                })();
            } catch(e) {
                throw e;
            }
    }, [navigate])

    useEffect(() => {
        try {
            (async () => {
                await editRequest('upload-image');
            });
        } catch (e){
            throw e;
        }
    }, [image]);

    useEffect(() => {      
        let slicedDate = birthDate.split('/');

        setDayOfBirth(slicedDate[0]);
        seMonthOfBirth(slicedDate[1]);
        setYearOfBirth(slicedDate[2]);

    }, [birthDate])

    function formatDateBr(dateOfDataBase) {
        let slicedDate = dateOfDataBase.split('-');
        let month = Number(slicedDate[1]);
        let day = slicedDate[2].split('T')[0];

        if(month < 10){
            month = '0'+month;
        }

        return `${day}/${month}/${slicedDate[0]}`;
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
            })
    
            if(!result.canceled){
                setImage(result.assets[0].uri);  
            }     
        } catch(e) {
            throw e;
        }
    };

    function saveProfile(){
        try {
            editRequest('upload-profile');
        } catch (e) {
            throw e;
        }
    }

    function redirectToHome(){
        navigate.navigate('Home');
    }

    async function editRequest(target){
        let formData = new FormData();
        formData.append('id', userInfos.id);
        
        if(target == 'upload-image'){
            formData.append('image', JSON.parse(
                        JSON.stringify({
                        uri : image,
                        type: mime.getType(image),
                        name: 'profile'
                    })
                )
            );    
        }else{
            formData.append('name', name)
            formData.append('birthDate', `${yearOfBirth}-${monthOfBirth}-${dayOfBirth}T00:00:00.000+00:00`)
            formData.append('phone', unmaskPhone(phone))
            formData.append('cpf', cpf)
            formData.append('password', password)
        }

        try {
            await axios.put('https://jrt-medicamentos.onrender.com/users', formData, {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data'
                    }
            })
        } catch(e) {
            throw e;               
        }
    }
        
    return(
        <View style={{width: globalStyle.maxWidth}}>
            <View>
                <Pressable>
                    <Text onPress={redirectToHome} style={editStyle.editButton}>Voltar para o início</Text>
                </Pressable>
            </View>
            <Text style={Styles.title}>Meus Dados</Text>

            <View style={Styles.imageContainer}>
                <Image 
                   source={{uri: userInfos.imageProfilePath ? userInfos.imageProfilePath : 'https://images.nightcafe.studio//assets/profile.png'}} style={{height: 95, width: 95, borderRadius: 7, marginBottom: 10, marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}}
                />
                <Pressable style={Styles.pressable} onPress={pickImage}>
                    <Image 
                        source={require('../../assets/changeImage.png')}
                        style={Styles.iconImage}
                    />
                </Pressable>
            </View>
            <View style={{position: 'relative'}}>
                <Text style={styles.label}>Nome</Text>
                <TextInput value={name} style={[styles.input, styles.container]} onChangeText={(text) => { setName(text) }} placeholder="" />

                {/*
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <TextInput value={birthDate} style={[styles.input, styles.container]} placeholder="14/04/2023" onChangeText={(text) => { setBirthDate(text) }} />      
                */}

                <Text style={styles.label}>Data de Nascimento</Text>   
                <InputBirthDate placeholder={birthDate} valueToSet={setBirthDate} variable={birthDate}  />

                <Text style={styles.label}>Telefone</Text>
                <TextInputMask
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                    value={phone}
                    onChangeText={text => {
                        setPhone(text);
                    }}
                    style={[styles.input, styles.container]}
                />

                <ButtonPrimary cta="Salvar" callBackFunction={saveProfile} />      
            </View>
        </View>
    )
};

const styles = StyleSheet.create(editStyle);

const Styles = StyleSheet.create({
    title: {
        fontFamily: globalStyle.mavenBold,
        fontSize: 23,
        color: "#484848",
        marginTop: 11
    },

    imageContainer: {
        position: 'relative',
        width: 95,
        marginLeft: "auto",
        marginRight: "auto"
    },

    pressable: {
        position: "absolute",
        top: 10,
        right: -15,
    },

    iconImage: {
        height: 36,
        width: 36,
    }
})