import { useState, useEffect, useContext } from "react";
import { Text, TextInput, View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TitlePage from './../components/TitlePage';
import ButtonPrimary from "./../components/ButtonPrimary";
import DropdownInput from "./../components/DropdownInput";

import inputWithIcon from './../../global/styles/inputWithIcon';

import axios from "axios";
import { IsLogged } from './../contexts/IsLoggedContext';
import InputBirthDate from "../components/InputBirthDate";

export default function NewMedicament(){
    const [dropdownValueActive, setDropdownValueActive] = useState("1x por dia");
    const [dropdownValueActiveFormatted, setDropdownValueActiveFormatted] = useState('de 24 em 24 horas');
    const [nameMedicament, setNameMedicament] = useState("");
    const [timeInit, setTimeInit] = useState("");
    const [dosage, setDosage] = useState("");
    const [completationDate, setCompletationDate] = useState("");
    const { userInfos } = useContext(IsLogged);

    const navigation = useNavigation();

    const [dropdownList, setDropdownList] = useState(false);

    useEffect(() => {
        if(dropdownValueActive == '1x por dia'){
            setDropdownValueActiveFormatted('de 24 em 24 horas');
        }else if(dropdownValueActive == '2x por dia'){
            setDropdownValueActiveFormatted('de 12 em 12 horas');
        }else if(dropdownValueActive == '3x por dia'){
            setDropdownValueActiveFormatted('de 8 em 8 horas');
        }else if(dropdownValueActive == '4x por dia'){
            setDropdownValueActiveFormatted('de 6 em 6 horas');
        }else if(dropdownValueActive == '6x por dia'){
            setDropdownValueActiveFormatted('de 4 em 4 horas');
        }
    }, [dropdownValueActive]);

    function saveMedicament() {
        function formatDate(dateDefault){
            let slicedDate = dateDefault.split('/');

            return new Date(`${slicedDate[2]}-${slicedDate[1]}-${slicedDate[0]}`); 
        }

        axios.post('https://jrt-medicamentos.onrender.com/medicaments', { 
            name: nameMedicament, 
            timeInit: timeInit, 
            dosage: dosage, 
            frequency: dropdownValueActiveFormatted,
            completionDate: formatDate(completationDate),
            user: userInfos.id
        }).then(()=> {
            navigation.navigate('Meus Medicamentos');
        })
    };

    return(
        <View>
            <TitlePage title="Novo medicamento" />
    
            <View style={{position: 'relative'}}>
                <Text style={styles.label}>Nome</Text>
                <TextInput value={nameMedicament} style={[styles.input, styles.container]} onChangeText={(text) => { setNameMedicament(text) }} placeholder="" />

                <Text style={styles.label}>Horário início do tratamento</Text>
                <TextInput value={timeInit} style={[styles.input, styles.container, timeInit.length == "" ? styles.placeholderActive : styles.placeholderInactive]} onChangeText={(text) => {setTimeInit(text)} } placeholder="16:30" />

                <Text style={styles.label}>Dosagem</Text>
                <TextInput value={dosage} style={[styles.input, styles.container]} placeholder="" onChangeText={(text) => { setDosage(text) }} />    
                
                <Text style={styles.label}>Data de finalização</Text>   
                <InputBirthDate placeholder={"14/04/2024"} valueToSet={setCompletationDate} variable={completationDate}  />
            
                {/* 
                    <Text style={styles.label}>Data de finalização</Text>   
                    <TextInput value={completationDate} style={[styles.input, styles.container]} placeholder="14/04/2023" onChangeText={(text) => { setCompletationDate(text) }} />      
                */} 
                <View style={{zIndex: 2, height: 94,}}>
                        <Text style={styles.label}>Frequência</Text>
                        <ScrollView>
                            <DropdownInput value="1x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="2x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="3x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="4x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="6x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                        </ScrollView>
                </View>
            </View>
            
            <ButtonPrimary cta="Salvar" callBackFunction={saveMedicament} />      
        </View>
    )
}

const styles = StyleSheet.create(inputWithIcon);