import { StyleSheet, View, SafeAreaView, Button } from 'react-native';

import  AppLoading from 'expo-app-loading';

import globalStyle from './global/styles';
import MyMedicaments from './pages/MyMedicaments';
import CustomerDrawer from './components/CustomDrawer';
import Header from './components/Header';

// menu navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useState } from 'react';

import {useAuth0, Auth0Provider} from 'react-native-auth0';

import {
  useFonts,
  MavenPro_400Regular,
  MavenPro_500Medium,
  MavenPro_600SemiBold,
  MavenPro_700Bold,
  MavenPro_800ExtraBold,
  MavenPro_900Black,
} from '@expo-google-fonts/maven-pro';


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
    <Auth0Provider domain={"dev-xpdrvj2vqnftvshz.us.auth0.com"} clientId={"kfQlOx7pWuVLGB7r4VyE4lL1tX1D4ybP"}>
      <NavigationContainer>
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
          <Drawer.Screen name="Home" component={MyMedicamentsConfigStyle} />
          <Drawer.Screen name="Meus Medicamentos" component={MyMedicamentsConfigStyle} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
}

function MyMedicamentsConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <MyMedicaments userId="6373b0718eba0b12262c4d72" />
          <LoginButton />
        </View>
      </View>
  </SafeAreaView>
  )
}


const LoginButton = () => {
  const {authorize} = useAuth0();

  const onPress = async () => {
      try {
          await authorize();
      } catch (e) {
          console.log(e);
      }
  };

  return <Button onPress={onPress} title="Log in" />
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