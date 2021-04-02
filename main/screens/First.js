import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './MainTabScreen';



const Drawer = createDrawerNavigator();


export default function First() {
  return (
    <NavigationContainer initialRouteName="Home" >
     <Drawer.Navigator >
        <Drawer.Screen name="Home" component={MainTabScreen} />
       {/* <Drawer.Screen name="Details" component={DetailsStackScreen} />*/}
      </Drawer.Navigator>
      </NavigationContainer>
  );
}

