import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import globalStyle from './../../global/styles/index.js';

export default function MedicamentCard(props){
    const [dateFormatted, setDateFormatted] = useState();

    useEffect(() => {
        let dateSplit = props.dateInsert.split('-');
        setDateFormatted(`${dateSplit[2].split('T')[0]}/${dateSplit[1]}/${dateSplit[0]}`)
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.containersInfos}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.dateInsertStyle}>{dateFormatted}</Text>
            </View>
            <View style={styles.containersInfos}>
                <Text style={styles.dosage}>{props.dosage}</Text>
                <Text style={styles.time}>{props.time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: globalStyle.maxWidth,
        borderRadius: 8,
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 90,
    },

    containersInfos: {
        flex: 1,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    name: {
        fontSize: 16,
        color: globalStyle.colorPrimary,
        fontFamily: globalStyle.mavenBold
    },

    dosage: {
        fontSize: 13,
        color: '#9F9F9F',
        fontFamily: globalStyle.mavenRegular
    },

    time: {
        fontSize: 20,
        color: '#9F9F9F',
        fontWeight: '300',
        fontFamily: globalStyle.mavenRegular
    },

    dateInsertStyle:{
        fontSize: 13,
        color: '#FF1493',
        fontFamily: globalStyle.mavenBold
    }
})