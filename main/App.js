import React from 'react';
import {SafeAreaView,} from 'react-native';
import Login from './auth/Login';
const App: () => React$Node = () => {
   return (
       <SafeAreaView style={{flex:1}}>
            <Login/>
       </SafeAreaView>
   );
};
export default App;