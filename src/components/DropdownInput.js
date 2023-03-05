import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function DropdownInput(props){
    function changeStateList(){
        props.setListVisibility(true)
        console.log(props.listVisibility);
    }

    function changeStateInput(){
        if(props.listVisibility){
            props.setInputActive(props.value);
            props.setListVisibility(false);
        }
    }

    return(
        props.inputActive == props.value || props.listVisibility ? (        
                <TouchableOpacity style={[styles.container, {overflow: 'scroll'}, props.listVisibility == true ? styles.containerActive : styles.containerInactive]} onPress={() => {changeStateList(); changeStateInput();}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={[styles.input, {textAlignVertical: "center"}]}>{props.value}</Text>
                    </View>
        
                    <Image 
                        source={require('../../assets/images/arrow.png')}
                        style={[styles.icon, {height: 27, width: 21}, props.listVisibility == true ? styles.inactive : styles.active]}
                    />
                </TouchableOpacity>
            
            )  : <View></View>
        )    
}

const styles = StyleSheet.create(inputWithIcon)
