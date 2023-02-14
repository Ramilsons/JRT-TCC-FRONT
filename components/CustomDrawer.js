import { View, Text, Image, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import globalStyle from '../global/styles'

import { IsLogged } from './../contexts/IsLoggedContext';

export default function CustomDrawer(props) {
    const { userInfos } = useContext(IsLogged);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: globalStyle.greenPrimary}}>
                <View style={{padding: 20}}>
                    <Image source={'https://images.nightcafe.studio//assets/profile.png'} style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10, padding: 20}} />
                    <Text style={styles.name}>{userInfos.name}</Text>
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