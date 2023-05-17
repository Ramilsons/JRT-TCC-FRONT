import { View, StyleSheet, StatusBar } from 'react-native';

export default function DelimiterTop(){
    return(
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingBottom: 10,
        paddingTop: 10,
        height: 60,
        marginTop: StatusBar.currentHeight,
        zIndex: 3
    }
})