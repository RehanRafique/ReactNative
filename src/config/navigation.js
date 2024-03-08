
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Button, View, Text } from "react-native";
import CarSelection from "../components/Carselection/carselection"
import Dashboard from "../components/Dashboard/dashboard";
import PickUp from "../components/PickUp/pickup";
import Dastination from "../components/Dastination/dastination";

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="PickUp" component={PickUp} />
            <Stack.Screen name="Dastination" component={Dastination} />
            <Stack.Screen name="CarSelection" component={CarSelection} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
