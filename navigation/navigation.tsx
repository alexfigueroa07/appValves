import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "@/screens/home";
import Welcome from "@/screens/welcome";
import Login from "@/screens/login";
import Register from "@/screens/register";
import RegisterCompany from "@/screens/registerCompany";
import RegisterWater from "@/screens/registerWater";
import RegisterWaterNotes from "@/screens/registerWaterNotes";
import WaterRegistered from "@/screens/waterRegistred";
import RegisterLeaks from "@/screens/registerLeaks";
import WelcomeUser from "@/screens/welcomeUser";
import About from "@/screens/aboutAlert";
import HistoryLeaks from "@/screens/historyLeaks";
import Protocols from "@/screens/protocols";
import Valves from "@/screens/valves";
import Notification from "@/screens/historyNotification";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">


            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="RegisterCompany"
                component={RegisterCompany}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="RegisterWater"
                component={RegisterWater}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="RegisterWaterNotes"
                component={RegisterWaterNotes}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="WaterRegistred"
                component={WaterRegistered}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="RegisterLeaks"
                component={RegisterLeaks}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="WelcomeUser"
                component={WelcomeUser}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="HistoryLeaks"
                component={HistoryLeaks}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Protocols"
                component={Protocols}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Valves"
                component={Valves}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default function Navigation() {
    return (
        <NavigationContainer independent={true}>
            <MyStack />
        </NavigationContainer>
    );
}