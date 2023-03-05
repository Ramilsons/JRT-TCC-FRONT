import { Text, View, StyleSheet, Linking } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import TitlePage from '../components/TitlePage';
import MedicamentCard from '../components/MedicamentCard';
import AddButton from '../components/AddButton';
import LoadingCustom from '../components/LoadingCustom';
import { useNavigation } from "@react-navigation/native";

import globalStyle from './../../global/styles/index';

import axios from 'axios';

import { IsLogged } from './../contexts/IsLoggedContext';

export default function MyMedicaments(){
    const { userInfos } = useContext(IsLogged);
    const [allMedicamentsActive, setAllMedicamentsActive] = useState(null);
    const navigation = useNavigation();

    if(userInfos.isLogged){
        useEffect(function(){
            navigation.addListener('focus', () => {
                axios.get(`https://jrt-medicamentos.onrender.com/medicaments/${userInfos.id}`)
                .then((response) => {
                    console.log(response.data)
                    setAllMedicamentsActive(response.data);
                })
                .catch((e) => {
                    console.log('houve um erro 1: '+e);
                })
            });
        }, [navigation]);
    }else{
       navigation.navigate("Login")
    }


    if(allMedicamentsActive == undefined) {
        return(
            <LoadingCustom /> 
        )
    }else if(allMedicamentsActive.length > 0){
        console.log(allMedicamentsActive)
        return(
            <View style={styles.containerMedicamentCard}>
                <TitlePage title="Meus Medicamentos" />
                {
                    allMedicamentsActive.map(function(eachMedicament){
                        return(
                            <MedicamentCard key={eachMedicament._id} name={eachMedicament.name} dosage={eachMedicament.dosage} time={eachMedicament.allTimes[0]} />
                        )
                    })
                }
                <AddButton styleCustom={styles.button} cta="+" linkRedirect="Novo Medicamento" />
            </View> 
        )
    }else{
        return(
            <View style={styles.wrapper}>
                <Text style={styles.text}>Você não possui nenhum medicamento ativo.</Text>
                <Text style={styles.text}>Cadastre um agora mesmo!</Text>
                <AddButton styleCustom={styles.button} cta="+" linkRedirect="Novo Medicamento" />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    containerMedicamentCard: {
        alignItems: 'center',
        justifyContent: 'center',
        width: globalStyle.maxWidth
    },

    wrapper: {
        maxWidth: globalStyle.maxWidth,
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
        color: globalStyle.greenPrimary,
        fontFamily: globalStyle.mavenMedium
    }
})