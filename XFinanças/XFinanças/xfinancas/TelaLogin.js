import React, { useState } from "react";
import { Text, View, TextInput, Image, Alert, TouchableOpacity } from "react-native";
import styles from './styles/global.js';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from './UserContext';

function TelaLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const { setUser } = useUser();

    useFocusEffect(
        React.useCallback(() => {
            setEmail('');
            setSenha('');
        }, [])
    );

    const autenticar = () => {
        const token = 'Q!W@ee344%%R';

        axios.get(`http://172.16.42.90/XFinancas/select_login/?token=${token}&email=${email}&senha=${senha}`)
            .then(response => {
                if (response.data.error) {
                    Alert.alert("Erro", response.data.error);
                } else {
                    setUser(response.data);
                    navigation.navigate('TelaHome', { users: response.data, refresh: true }); 
                }
            })
            .catch(error => {
                console.error('Erro ao autenticar:', error);
                alert('Erro ao conectar ao serviço');
            });

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require("./assets/logo.jpg")} />
                <Text style={styles.titleLogin}>XFinanças</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.h1l}>Login</Text>
                <View style={styles.formLogin}>
                    <Text>Olá, seja bem vindo(a)!</Text>
                    <Text>Email</Text>
                    <TextInput style={styles.inputlogin}
                        placeholder='Digite seu email'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text>Senha</Text>
                    <View style={styles.senhaContainer}>
                        <TextInput style={styles.inputlogin}
                            placeholder='Digite sua senha'
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!senhaVisivel}
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
                        <TouchableOpacity style={styles.btn} onPress={autenticar}>
                            <Text style={styles.btnText}>Logar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.linksForm}>
                        <Text style={styles.linkSenha}>Esqueceu a senha?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
                            <Text style={styles.linkCadastro}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default TelaLogin;
