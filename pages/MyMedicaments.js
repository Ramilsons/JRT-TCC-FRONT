import { Text, View, StyleSheet, Linking } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import TitlePage from '../components/TitlePage';
import MedicamentCard from '../components/MedicamentCard';
import AddButton from '../components/AddButton';
import LoadingCustom from '../components/LoadingCustom';
import { useNavigation } from "@react-navigation/native";

import globalStyle from '../global/styles';

import axios from 'axios';

import { IsLogged } from './../contexts/IsLoggedContext';

export default function MyMedicaments(){
    const { userInfos } = useContext(IsLogged);
    const [allMedicamentsActive, setAllMedicamentsActive] = useState([]);
    const navigation = useNavigation();

    console.log(userInfos)
    if(userInfos.isLogged){
        useEffect(function(){
            axios.get(`https://jrt-medicamentos.onrender.com/medicaments/${userInfos.id}`)
            .then((response) => {
                console.log(response.data)
                setAllMedicamentsActive(response.data);
            })
            .catch((e) => {
                console.log('houve um erro 1: '+e);
            })
        }, []);
    }else{
       navigation.navigate("Login")
    }


    if(allMedicamentsActive.length > 0){
        console.log(allMedicamentsActive)
        return(
            <View style={styles.containerMedicamentCard}>
                <TitlePage title="Meus Medicamentos" />
                {
                    allMedicamentsActive.map(function(eachMedicament){
                        return(
                            <MedicamentCard key={eachMedicament._id} name={eachMedicament.name} dosage={eachMedicament.dosage} time={eachMedicament.allTimes[0]} />
                            // <Text key={eachMedicament._id}>{eachMedicament.name}</Text>
                        )
                    })
                }
                <AddButton styleCustom={styles.button} cta="+" linkRedirect="/add" />
            </View> 
        )
    }else {
        return(
            <LoadingCustom /> 
        )
    }
};

const styles = StyleSheet.create({
    containerMedicamentCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapper: {
        maxWidth: globalStyle.maxWidth,
    },
})