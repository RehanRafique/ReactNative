'use-client'

import React from 'react'
import CarSelection from './src/components/Carselection/carselection';
import { View } from 'react-native'
import Destination from './src/components/Dastination/dastination';
import Navigation from './src/config/navigation';
import PickUp from './src/components/PickUp/pickup';
import Dashboard from './src/components/Dashboard/dashboard';

function App() {
  return (
    <View>
      {/* <Navigation /> */}
      {/* <Dashboard /> */}
      {/* <PickUp /> */}
      <Destination/>
    </View>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     width: 200
//   },
//   tinyLogo: {
//     height: 200,
//     width: 200
//   }
// });

export default App;
