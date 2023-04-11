import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import  AppLoading from 'expo-app-loading';

import globalStyle from './global/styles';

import MyMedicaments from './src/screens/MyMedicaments';
import Login from './src/screens/Login';
import NewUser from './src/screens/NewUser';
import NewMedicament from './src/screens/NewMedicament';
import Profile from './src/screens/Profile';
import EditMedicament from './src/screens/EditMedicaments';

import CustomerDrawer from './src/components/CustomDrawer';
import Header from './src/components/Header';

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

import IsLoggedProvider from './src/contexts/IsLoggedContext';

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
          <Drawer.Screen name="Login"  component={LoginConfigStyle} options={({ route, navigation }) => {
              return {
                swipeEnabled: false,
                drawerLabel: () => null,
                drawerItemStyle: { display: 'none' }
              };
            }}
          />
          <Drawer.Screen name="Home" component={HomeConfigStyle} />
          <Drawer.Screen name="Meus Medicamentos" component={MyMedicamentsConfigStyle} />
          <Drawer.Screen name="Novo Medicamento" component={NewMedicamentConfigStyle} />
          <Drawer.Screen name="Perfil" component={PerfilConfigStyle} />
          <Drawer.Screen name="Editar Medicamento" component={EditMedicamentConfigStyle} options={({ route, navigation }) => {
              return {
                swipeEnabled: false,
                drawerLabel: () => null,
                drawerItemStyle: { display: 'none' }
              };
            }}
          />
          <Drawer.Screen name="Novo Usuario"  component={NewUserConfigStyle} options={({ route, navigation }) => {
                return {
                  swipeEnabled: false,
                  drawerLabel: () => null,
                  drawerItemStyle: { display: 'none' }
                };
              }}
            />
        </Drawer.Navigator>
      </IsLoggedProvider>
    </NavigationContainer>
  );
}

function HomeConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <Text>Home</Text>
        </View>
      </View>
  </SafeAreaView>
  )
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

function NewMedicamentConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <NewMedicament />
        </View>
      </View>
  </SafeAreaView>
  )
}

function PerfilConfigStyle({ navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <Profile/>
        </View>
      </View>
  </SafeAreaView>
  )
}

function EditMedicamentConfigStyle({ route, navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <Header functionOpen={navigation} />
      <View style={styles.container}> 
        <View>
          <EditMedicament idParam={route.params.medicamentId}  />
        </View>
      </View>
  </SafeAreaView>
  )
}

function NewUserConfigStyle({ route, navigation }){
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}> 
        <View>
          <NewUser />
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