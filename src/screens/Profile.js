import { View, Text, Pressable, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import { IsLogged } from '../contexts/IsLoggedContext';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

import editStyle from '../../global/styles/inputWithIcon';
import globalStyle from '../../global/styles';
import ButtonPrimary from '../components/ButtonPrimary';
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
    const [formattedDate, setFormattedDate] = useState([]);
    const [finallyDate, setFinallyDate] = useState([]);

    useEffect(() => {
        let dateSeparate = birthDate.split("/");
        setFormattedDate(dateSeparate);
    }, [birthDate]);

    useEffect(() => {
        let finallyDateOrganize = new Date(formattedDate[2], formattedDate[1]-1, formattedDate[0], 0, 0, 0);
        setFinallyDate(finallyDateOrganize);
    }, [formattedDate])

    function formatDateBr(dateOfDataBase) {
        let slicedDate = dateOfDataBase.split('-');
        let month = Number(slicedDate[1]);

        return `${slicedDate[2].split('T')[0]}/${month}/${slicedDate[0]}`;
    }

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await axios.get(`https://jrt-medicamentos.onrender.com/users/${userInfos.id}`)
            setName(result.data.name);
            setPhone(result.data.phone);
            setPassword(result.data.password);
            setCpf(result.data.cpf);
    
            let newCompletionDate = formatDateBr(result.data.birthDate);
            setBirthDate(newCompletionDate); 
        })();
    }, [navigate])

    useEffect(() => {
        editRequest('upload-image');
    }, [image]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })

        if(!result.canceled){
            setImage(result.assets[0].uri);  
        }else{
            console.log('cancelou');
            console.log(result)
        }
    };

    function redirectToHome(){
        navigate.navigate('Home');
    }

    function saveProfile(){
        editRequest('upload-profile');
    }

    async function editRequest(target){
        console.log(image);

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
            formData.append('birthDate', finallyDate)
            formData.append('phone', unmaskPhone(phone))
            formData.append('cpf', cpf)
            formData.append('password', password)
        }

        const result = await axios.put('https://jrt-medicamentos.onrender.com/users', formData, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'multipart/form-data'
            }
        })

        if(result.status == 200){
            uploadInfos(cpf);
        }else{
            console.log('codigo nao deu 200')
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

                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput value={birthDate} style={[styles.input, styles.container]} placeholder="14/04/2023" onChangeText={(text) => { setBirthDate(text) }} />      

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