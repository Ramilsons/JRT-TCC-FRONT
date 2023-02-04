import { StyleSheet, View } from 'react-native';

import  AppLoading from 'expo-app-loading';

import globalStyle from './global/styles';
import MyMedicaments from './pages/MyMedicaments';
import CustomerDrawer from './components/CustomDrawer';

// menu navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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

  if(!fontsLoaded)   {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomerDrawer {...props} />} useLegacyImplementation 
        screenOptions={
          {
            headerStyle: {
              backgroundColor: globalStyle.greenPrimary,
            },
            headerShown: true,
            headerTitleStyle: {
              display: 'none'
            },

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
  );
}

function MyMedicamentsConfigStyle(){
  return(
    <View style={styles.container}> 
    <View>
      <MyMedicaments userId="6373b0718eba0b12262c4d72" />
    </View>
  </View>
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