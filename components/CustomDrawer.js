import { View, Text, Image, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import globalStyle from '../global/styles'


export default function CustomDrawer(props) {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: globalStyle.greenPrimary}}>
                <View style={{padding: 20}}>
                    <Image source={require('../assets/images/user-profile.jpg')} style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10, padding: 20}} />
                    <Text style={styles.name}>Ramilson Silva</Text>
                </View>
                <View style={styles.viewLinks}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        color: '#fff', 
        fontFamily: globalStyle.mavenMedium
    },

    viewLinks: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff'
    }
})