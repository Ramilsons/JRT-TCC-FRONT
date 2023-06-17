import { View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect, useContext} from 'react';

import TitlePage from '../components/TitlePage';
import MedicamentCard from '../components/MedicamentCard';
import AddButton from '../components/AddButton';
import LoadingCustom from '../components/LoadingCustom';
import NoMedicament from '../components/NoMedicaments';

import globalStyle from './../../global/styles/index';
import { IsLogged } from './../contexts/IsLoggedContext';
import axios from 'axios';

export default function MyMedicaments(){
    const { userInfos } = useContext(IsLogged);
    const [allMedicamentsActive, setAllMedicamentsActive] = useState(null);
    const navigation = useNavigation();

    if(userInfos.isLogged){
        useEffect(function(){
            navigation.addListener('focus', () => {
                axios.get(`https://jrt-medicamentos.onrender.com/medicaments/${userInfos.id}`)
                .then((response) => {
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
        return(
            <View style={styles.containerMedicamentCard}>
                <TitlePage title="Meus Medicamentos" />
                {
                    allMedicamentsActive.map(function(eachMedicament){
                        return(
                            <MedicamentCard key={eachMedicament._id} name={eachMedicament.name} id={eachMedicament._id} dosage={eachMedicament.dosage} time={eachMedicament.allTimes[0]} />
                        )
                    })
                }
                <AddButton styleCustom={styles.button} cta="+" linkRedirect="Novo Medicamento" />
            </View> 
        )
    }else{
        return(
            <NoMedicament />
        )
    }
};

const styles = StyleSheet.create({
    containerMedicamentCard: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: globalStyle.maxWidth
    }
})