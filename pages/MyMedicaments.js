import { Text, View, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';

import TitlePage from '../components/TitlePage';
import MedicamentCard from '../components/MedicamentCard';
import Button from '../components/Button';

import globalStyle from '../global/styles';


import axios from 'axios';

export default function MyMedicaments({userId}){
    const [allMedicamentsActive, setAllMedicamentsActive] = useState([]);

    useEffect(function(){
        axios.get(`https://jrt-medicamentos.onrender.com/medicaments/${userId}`)
        .then((response) => {
            console.log(response.data)
            setAllMedicamentsActive(response.data);
        })
        .catch((e) => {
            console.log('houve um erro 1: '+e);
        })
    }, []);

    return(
        <View>
            <View style={styles.wrapper}>
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
                    <Button styleCustom={styles.button} cta="+" linkRedirect="/add" />
                </View>
            </View>
        </View>
    )
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