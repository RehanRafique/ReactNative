import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Destination({ navigation, route }) {
  const { pickup } = route.params
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState();

  useEffect(() => {
    (async () => {
      Location.watchPositionAsync(
        {
          accuracy: 6,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (location) => {
          console.log('location', location);
          setLocation(location);
        }
      );
    })();
  }, []);

  const searchPlaces = (text) => {
    setDestination();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq32dYZvahdoiWKylNmr9Ggca5P8wDpLXMGgKQsTM5yiuA='
      }
    };
    const { latitude, longitude } = location.coords;
    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000, `, options) // Fixed URL formatting
      .then(response => response.json())
      .then(response => {
        console.log(response, 'Response');
        setPlaces(response.results);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onPlaceSelect = (item) => {
    setDestination(item);
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }
  console.log("pickup", pickup);
  return (
    <View style={styles.container}>
      <Text> Your PickUP Location is  </Text>
      <Text> {pickup.name},{pickup.location.address}   </Text>
    
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Search for a place..."
          onChangeText={searchPlaces}
        />


      </View>
     {!destination && <View>
      {places.map((item,index)=>{
        return<TouchableOpacity key={index} onPress={()=>onPlaceSelect(item)}>

          <Text>{item.name}, {item.location.address}</Text>
        </TouchableOpacity>

      })
      }
      </View>}


      {/* {!pickup && (
        <View>
          {places.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
              <Text style={{ height: 30, padding: 5 }}>{item.name}, {item.location.address}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )} */}
      {/* {pickup && (
        <View style={{ padding: 10, justifyContent: "center", display: "flex", alignItems: "center" }}>
          <Text  >Your selected pickup location is</Text>
          <Text >{pickup.name}, {pickup.location.address}</Text>
        </View>
      )} */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        title={"your Loaction"}
        description={"Expertizo University"}
        />



        {/* {pickup && pickup.geocodes && (
          <Marker
            coordinate={{
              latitude: pickup.geocodes.main.latitude,
              longitude: pickup.geocodes.main.longitude,
            }}
          />
        )} */}
      </MapView>
      {/* <Button disabled={!pickup} title="CarSelection" onPress={() => navigation.navigate("CarSelection")} /> */}
      {/* <Button
        disabled={!pickup}
        title="Navigate to CarSelection" 
        onPress={() => navigation.navigate('CarSelection', { pickup: pickupData, destination: destinationData })}
      /> */}
      <Button

        disabled={!destination}
        title="Select Car"
        onPress={() => navigation.navigate('CarSelection', { pickup, destination})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
  },
  input: {
    width: '65%',
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,

  },
  locationSearch: {
    height: 40,
    width: "30%",
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
});

// import {Button, View,Text } from "react-native";

// function Dastination({navigation}) {
//     return<View><Text>Dastination</Text>
//             <Button title="Go to PickUp" onPress={() => navigation.navigate('PickUp')} />
//     </View>
// }

// export default Dastination;