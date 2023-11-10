import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import HomePage from "../Screens/home";
import AddNewPost from "../Screens/addNewPost";

const Stack = createNativeStackNavigator();
const Navigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Homepage" component={HomePage} />
                <Stack.Screen name="addNewPost" component={AddNewPost} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation