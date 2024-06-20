import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import styles from './styles/global.js';
import Menu from "./components/menu.js";

function TelaAddSaldo({ route, navigation }) {
    const { users } = route.params;
    const [saldo, setSaldo] = useState('');

    console.log("ADD SALDO COM O ID: " + users.idusuario);

    const cadastrarSaldo = () => {
        if (saldo.trim() !== '') {
            const token = 'Q!W@ee344%%R';
            axios.post('http://172.16.42.90/XFinancas/cadastro_saldo/', { token, saldo, users: users.idusuario })
                .then(response => {
                    const data = response.data;
                    if (data.success) {
                        Alert.alert("Sucesso", "Saldo adicionado com sucesso!");
                        navigation.navigate('TelaHome', { users, refresh: true });
                    } else {
                        Alert.alert("Erro", data.message);
                    }
                })
                .catch(error => {
                    console.log('Erro ao enviar dados:', error);
                    Alert.alert('Erro', 'Erro ao enviar dados para o servidor');
                });
        } else {
            Alert.alert("Erro", 'Preencha todos os campos!');
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerCategoria}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("./assets/seta.png")} style={styles.backCategoria} />
                </TouchableOpacity>
                <Text style={styles.titleSaldo}>
                    Cadastrar saldo
                </Text>
            </View>
            <View style={styles.formCategoria}>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Saldo</Text>
                    <TextInput style={styles.inputCategoria}
                        placeholder='Digite a quantidade de saldo'
                        value={saldo}
                        onChangeText={text => {
                            const formattedValue = text.replace(/[^0-9]/g, '');
                            setSaldo(formattedValue);
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btnCategoria} onPress={cadastrarSaldo}>
                <Text style={styles.btnText}>Adicionar saldo</Text>
            </TouchableOpacity>
            <Menu />
        </View>
    )
}

export default TelaAddSaldo;
``
