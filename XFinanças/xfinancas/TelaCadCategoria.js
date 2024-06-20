import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import styles from './styles/global.js';
import Menu from "./components/menu.js";

function TelaCadCategoria({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const { users } = route.params;

    const cadastrarCategoria = () => {
        if (nome.trim() !== '' && imagem.trim() !== '') {
            const token = 'Q!W@ee344%%R';
            axios.post('http://172.16.42.90/XFinancas/cadastro_categoria/', { token, nome, imagem })
                .then(response => {
                    const data = response.data;
                    if (data.success) {
                        Alert.alert("Sucesso", "Categoria criada com sucesso!");
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
                <Text style={styles.titleCategoria}>
                    Cadastro de categoria
                </Text>
            </View>
            <View style={styles.formCategoria}>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Nome</Text>
                    <TextInput style={styles.inputCategoria}
                        placeholder='Digite o nome da categoria'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Foto&nbsp;&nbsp;</Text>
                    <TextInput style={styles.inputCategoria}
                        placeholder='Digite o URL da imagem'
                        value={imagem}
                        onChangeText={(text) => setImagem(text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btnCategoria} onPress={cadastrarCategoria}>
                <Text style={styles.btnText}>Criar categoria</Text>
            </TouchableOpacity>
            <Menu />
        </View>
    )
}

export default TelaCadCategoria;
