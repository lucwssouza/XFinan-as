import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import { UserProvider } from './UserContext';
import TelaHome from "./TelaHome";
import TelaCadCategoria from "./TelaCadCategoria";
import TelaDespesasCategoria from "./TelaDespesasCategoria";
import TelaCadDespesas from "./TelaCadDespesas";
import TelaAddSaldo from "./TelaAddSaldo";
import TelaRetorno from "./TelaRetorno";
import TelaDespesa from "./TelaDespesa";

const Stack = createStackNavigator();

function Navigation() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TelaLogin" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="TelaLogin" component={TelaLogin}></Stack.Screen>
                    <Stack.Screen name="TelaCadastro" component={TelaCadastro}></Stack.Screen>
                    <Stack.Screen name="TelaHome" component={TelaHome}></Stack.Screen>
                    <Stack.Screen name="TelaCadCategoria" component={TelaCadCategoria}></Stack.Screen>
                    <Stack.Screen name="TelaDespesasCategoria" component={TelaDespesasCategoria}></Stack.Screen>
                    <Stack.Screen name="TelaCadDespesas" component={TelaCadDespesas}></Stack.Screen>
                    <Stack.Screen name="TelaAddSaldo" component={TelaAddSaldo}></Stack.Screen>
                    <Stack.Screen name="TelaRetorno" component={TelaRetorno}></Stack.Screen>
                    <Stack.Screen name="TelaDespesa" component={TelaDespesa}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

export default Navigation;