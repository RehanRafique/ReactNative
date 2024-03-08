import {Button, View,Text } from "react-native";

export default function Dashboard({navigation}) {
    return<View><Text>Dashboard</Text>
            <Button title="Go to PickUp" onPress={() => navigation.navigate('PickUp')} />
    </View>
}
