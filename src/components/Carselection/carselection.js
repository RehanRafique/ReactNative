
import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, } from "react-native";

function CarSelection({ route }) {
    const { pickup, destination } = route.params;

    const fares = {
        bike: 50,
        rickshaw: 88,
        car: 100,
        bus: 150,
        truck: 200,
        airplane: 1000,
    };

    const images = {
        bike: require("./pic1.png.webp"), // Replace 'bike.png' with the path to your bike image
        rickshaw: require("./pic1.png.webp"), // Replace 'rickshaw.png' with the path to your rickshaw image
        car: require("./pic1.png.webp"), // Replace 'car.png' with the path to your car image
        truck: require("./pic1.png.webp"), // Replace 'truck.png' with the path to your truck image
    };

    const calculateFare = (vehicle) => {
        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
        const { latitude: destinationLat, longitude: destinationLong } =
            destination.geocodes.main;
        const distance = calcCrow(
            pickupLat,
            pickupLong,
            destinationLat,
            destinationLong
        );
        const fare = fares[vehicle] * distance;
        alert("RS." + fare.toFixed(2));
    };

    // Function to calculate distance between two locations
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return (Value * Math.PI) / 180;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Car Selection</Text>
            <View>
                <Text style={styles.Text}>Your Selected Pickup Location is</Text>
                <Text style={styles.Text}>
                    {pickup.name}, {pickup.location.address}
                </Text>
            </View>
            <View>
                <Text style={styles.Text}>Your Selected Destination Location is</Text>
                <Text style={styles.Text}>
                    {destination.name}, {destination.location.address}
                </Text>
            </View>

            {/*       
      <View style={styles.Button}>
        <TouchableOpacity onPress={() => calculateFare("bike")}>
          <Image source={images.bike} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare("rickshaw")}>
          <Image source={images.rickshaw} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => calculateFare("car")}>
          <Image source={images.car} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare("truck")}>
          <Image source={images.truck} style={styles.image} />
        </TouchableOpacity>
        
        
      </View> */}

            <View style={styles.Button}>
                <TouchableOpacity onPress={() => calculateFare("bike")}>
                    <View style={styles.imageContainer}>
                        <Image source={images.bike} style={styles.image} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => calculateFare("rickshaw")}>
                    <View style={styles.imageContainer}>
                        <Image source={images.rickshaw} style={styles.image} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => calculateFare("car")}>
                    <View style={styles.imageContainer}>
                        <Image source={images.car} style={styles.image} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => calculateFare("truck")}>
                    <View style={styles.imageContainer}>
                        <Image source={images.truck} style={styles.image} />
                    </View>
                </TouchableOpacity>
                {/* Add similar TouchableOpacity components for other vehicle types */}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Go Now"
                // onPress={() => navigation.navigate("CarSelection", { pickup })} // Assuming you don't need this navigation
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        textAlign: "center",
    },
    imageContainer: {
        alignItems: "center", // Center items horizontally
        marginRight: 10, // Add some margin between each image
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: "cover", // Adjust image inside the container
    },
    Button: {
        marginTop: 10,
        width: "100%",
        alignItems: "center", // Center items horizontally
        flexDirection: "row", // Arrange items horizontally
        justifyContent: "center", // Center items horizontally
    },
    buttonContainer: {
        width: 300,
        margin: 10,
        borderRadius: 10,
        alignSelf: "center",
        overflow: "hidden",
    },
    Text: {
        textAlign: "center",
        marginTop: 10,
    },
});


export default CarSelection;









// import {Button, View,Text } from "react-native";

// function CarSelection({navigation}) {
//     return<View><Text>CarSelection</Text>
//             {/* <Button title="Go to PickUp" onPress={() => navigation.navigate('PickUp')} /> */}
//     </View>
// }

// export default CarSelection;