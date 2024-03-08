import React, { useState, useEffect } from 'react'
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PickUp({ navigation }) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([])
    const [pickup, setPickup] = useState()

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
                timeInterval: 1000
            }, (location) => {
                setLocation(location)
            })

        })();
    }, []);



    const searchPlaces = (text) => {
        // console.log("Text" , text)
        setPickup()
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq38DsZJ6ojaNyPcFjOmd9ozsTRx0mdUpS2DETyzDeZLjI='
            }
        };

        const { latitude, longitude } = location.coords;

        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000,`, options)
            .then(response => response.json())
            .then(response => {
                console.log("Response", response)

                setPlaces(response.result);
            })
            .catch(err => console.log(err))

    }

    const onPlacesSelect = (item) => {
        setPickup(item)
    }

    if (errorMsg) {
        return <Text>{errorMsg}</Text>
    }

    if (!location) {
        return <Text> Loading... </Text>
    }



    return (
        <View style={styles.container}>
            <Text>PickUP</Text>

            <TextInput placeholder='Please Search any Location' onChangeText={searchPlaces} />
            {!pickup && <View>
                {places.map((item) => {
                    return <TouchableOpacity key={item.id} onPress={() => onPlacesSelect(item)}>
                        <Text>{item.name} , {item.location.address}</Text>
                    </TouchableOpacity>
                })}
            </View>}

            {pickup && <View>
                <Text>Your Selected Pickup Location is: </Text>
                <Text>{pickup.name}, {pickup.location.address}</Text>

            </View>}


            <MapView
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0001
                }}
                style={styles.map}>
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                    title={'Your Location'}
                    description={'Expertizo University'}
                />
            </MapView>

            <Button disabled={!pickup} title='Destination' onPress={() => navigation.navigate('Destination',{pickup})} />
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '70%',
    },
});



// import {Button, View,Text } from "react-native";

// function PickUp({navigation}) {
//     return<View><Text>PickUp</Text>
//             <Button title="Go to PickUp" onPress={() => navigation.navigate('PickUp')} />
//     </View>
// }

// export default PickUp;