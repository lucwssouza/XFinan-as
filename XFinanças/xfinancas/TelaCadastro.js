import React, { useState } from "react";
import { Text, View, TextInput, Button, Image, Alert, TouchableOpacity } from "react-native";
import styles from './styles/global.js';
import axios from "axios";

function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    cadastrar = () => {
        let token = 'Q!W@ee344%%R';
        if (senha.trim() == senha.trim()) {
            if (nome.trim() !== '' && senha.trim() !== '' && email.trim() !== '') {
                axios.post('http://172.16.42.90/XFinancas/cadastro/', { token, nome, email, senha })
                    .then(response => {
                        const data = response.data;
                        if (data.success) {
                            Alert.alert("Muito bem" + '\nCadastrado com sucesso!');
                            navigation.navigate('TelaLogin');
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(error => {
                        console.log('Erro ao enviar dados:', error);
                        alert('Erro ao enviar dados para o servidor');
                    });
            } else {
                Alert.alert("Erro ", 'Preencher Campos!!!');
            }
        } else {
            alert('Senha diferentes');
        }
    }

    const [senhaVisivel, setSenhaVisivel] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require("./assets/logo.jpg")} />
                <Text style={styles.titleLogin}>XFinanças</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.h1}>Cadastro</Text>
                <View style={styles.formLogin}>
                    <Text>Nome</Text>
                    <TextInput style={styles.inputlogin}
                        placeholder='Digite seu nome'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                    <Text>Email</Text>
                    <View style={styles.senhaContainer}>
                        <TextInput style={styles.inputlogin}
                            placeholder='Digite seu email'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />

                    </View>
                    <Text>Senha</Text>
                    <View style={styles.senhaContainer}>
                        <TextInput style={styles.inputlogin}
                            placeholder='Digite sua senha'
                            secureTextEntry={!senhaVisivel}
                            value={senha}
                            onChangeText={(text) => setSenha(text)}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setSenhaVisivel(!senhaVisivel)}
                        >
                            <Image
                                source={senhaVisivel ? require('./assets/olhoaberto.png') : require('./assets/olhofechado.png')}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.submit}>
                        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
                            <Text style={styles.btnText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.linksCadastro}>
                        <Text style={styles.linkSenha}>Já tem uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TelaLogin')}>
                            <Text style={styles.linkCadastro}>Logar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default TelaCadastro;