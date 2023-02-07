import { StyleSheet, View, SafeAreaView, Button } from 'react-native';

import  AppLoading from 'expo-app-loading';

import globalStyle from './global/styles';
import MyMedicaments from './pages/MyMedicaments';
import CustomerDrawer from './components/CustomDrawer';
import Header from './components/Header';
import Login from './pages/Login';

// menu navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useState } from 'react';

import {
  useFonts,
  MavenPro_400Regular,
  MavenPro_500Medium,
  MavenPro_600SemiBold,
  MavenPro_700Bold,
  MavenPro_800ExtraBold,
  MavenPro_900Black,
} from '@expo-google-fonts/maven-pro';

import IsLoggedProvider from './contexts/IsLoggedContext';

const Drawer = createDrawerNavigator();


export default function App() {
  let [fontsLoaded, error] = useFonts({
    MavenPro_400Regular,
    MavenPro_500Medium,
    MavenPro_700Bold,
  });

  let [showMenu, setShowMenu] = useState(false);

  if(!fontsLoaded)   {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <IsLoggedProvider>
        <Drawer.Navigator drawerContent={props => <CustomerDrawer {...props} />} useLegacyImplementation 
          screenOptions={
            {

              headerShown: showMenu,
              headerTintColor: '#fff',
              drawerActiveBackgroundColor: globalStyle.greenPrimary,
              drawerActiveTintColor: '#fff',
              drawerLabelStyle: {
                fontFamily: globalStyle.mavenMedium,
                fontSize: 15,
              }
            }
          }
        >
          <Drawer.Screen name="Login" component={LoginConfigStyle} />
          <Drawer.Screen name="Meus Medicamentos" component={MyMedicamentsConfigStyle} />
        </Drawer.Navigator>
      </IsLoggedProvider>
    </NavigationContainer>
  );
}

function MyMedicamentsConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <MyMedicaments />
        </View>
      </View>
  </SafeAreaView>
  )
}

function LoginConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}> 
        <View>
          <Login />
        </View>
      </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'MavenPro_400Regular',
  }, 

  regularFont:{
    fontFamily: 'MavenPro_400Regular'
  },

  boldFont:{
    fontFamily: 'MavenPro_700Bold'
  },
});