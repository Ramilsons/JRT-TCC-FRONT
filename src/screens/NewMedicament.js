import { useState, useEffect, useContext } from "react";
import { Text, TextInput, View, ScrollView, StyleSheet } from "react-native";
import TitlePage from './../components/TitlePage';
import ButtonPrimary from "./../components/ButtonPrimary";
import DropdownInput from "./../components/DropdownInput";

import inputWithIcon from '../global/styles/inputWithIcon';

import axios from "axios";
import { IsLogged } from './../contexts/IsLoggedContext';

export default function NewMedicament(){
    const [dropdownValueActive, setDropdownValueActive] = useState("1x por dia");
    const [nameMedicament, setNameMedicament] = useState("");
    const [timeInit, setTimeInit] = useState("");
    const [dosage, setDosage] = useState("");
    const [completationDate, setCompletationDate] = useState("");
    const { userInfos } = useContext(IsLogged);

    const [dropdownList, setDropdownList] = useState(false);

    useEffect(() => {
        console.log(dropdownList);
    }, [dropdownList]);

    function saveMedicament() {
        axios.post('', { 
            name: nameMedicament, 
            timeInit: timeInit, 
            dosage: dosage, 
            frequency: dropdownValueActive,
            completationDate: completationDate,
            user: userInfos.id
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
                <TextInput value={completationDate} style={[styles.input, styles.container]} placeholder="14/04/2023" onChangeText={(text) => { setCompletationDate(text) }} />      

                <View style={{zIndex: 2, height: 94,}}>
                        <Text style={styles.label}>Frequência</Text>
                        <ScrollView>
                            <DropdownInput value="1x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="2x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="3x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="4x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="5x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                            <DropdownInput value="6x por dia" inputActive={dropdownValueActive} setInputActive={setDropdownValueActive} listVisibility={dropdownList} setListVisibility={setDropdownList} />
                        </ScrollView>
                </View>
            </View>
            
            <ButtonPrimary cta="Salvar" onClick={saveMedicament} />      
        </View>
    )
}

const styles = StyleSheet.create(inputWithIcon);