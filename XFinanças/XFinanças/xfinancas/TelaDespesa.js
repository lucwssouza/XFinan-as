import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert, Platform } from "react-native";
import axios from 'axios';
import styles from './styles/global.js';
import Menu from "./components/menu.js";

function TelaDespesa({ route, navigation }) {
    const { despesa, users } = route.params;

    const [nome, setNome] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dataVencimento, setDataVencimento] = useState(new Date());
    const [valor, setValor] = useState('');
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {

        setSaldo(users.saldo || 0);

        if (despesa) {
            setNome(despesa.nome);
            setObservacao(despesa.observacao);
            setDataVencimento(new Date(despesa.data_vencimento));
            setValor(despesa.valor.toString());
        }
    }, [despesa]);

    const pagarDespesa = () => {
        if (nome.trim() !== '' && observacao.trim() !== '' && valor.trim() !== '') {
            const token = 'Q!W@ee344%%R';
            axios.post('http://172.16.42.90/XFinancas/pagar_despesa/', {
                token: token,
                despesa: despesa,
                iddespesas: despesa.iddespesas,
                users: users.idusuario
            })
                .then(response => {
                    const data = response.data;
                    if (data.success) {
                        Alert.alert("Sucesso", "Despesa paga com sucesso!");
                        const valorDespesa = parseFloat(valor);
                        const novoSaldo = saldo - valorDespesa;
                        setSaldo(novoSaldo);
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

    const excluirDespesa = () => {
        if (nome.trim() !== '' && observacao.trim() !== '' && valor.trim() !== '') {
            const token = 'Q!W@ee344%%R';
            axios.post('http://172.16.42.90/XFinancas/excluir_despesa/', {
                token: token,
                despesa: despesa,
                iddespesas: despesa.iddespesas,
                users: users.idusuario
            })
                .then(response => {
                    const data = response.data;
                    if (data.success) {
                        Alert.alert("Sucesso", "Despesa excluída com sucesso!");
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
                <Text style={styles.titleDespesa}>
                    Despesa
                </Text>
            </View>
            <View style={styles.formCategoria}>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Nome</Text>
                    <TextInput
                        style={styles.inputCategoria}
                        placeholder='Digite o nome da sua despesa'
                        value={nome}
                    />
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>OBS&nbsp;&nbsp;&nbsp;</Text>
                    <TextInput
                        style={styles.inputCategoria}
                        placeholder='Digite uma observação'
                        value={observacao}
                    />
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>DataV</Text>
                    <TouchableOpacity>
                        <Text style={styles.inputCategoria}>
                            {dataVencimento.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Valor&nbsp;&nbsp;</Text>
                    <TextInput
                        style={styles.inputCategoria}
                        keyboardType="numeric"
                        value={valor}
                    />
                </View>
            </View>
            <View style={styles.despesasOpcoes}>
                <TouchableOpacity style={styles.btnCategoria} onPress={pagarDespesa}>
                    <Text style={styles.btnText}>Pagar despesa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCategoria2} onPress={excluirDespesa}>
                    <Text style={styles.btnText}>Excluir despesa</Text>
                </TouchableOpacity>
            </View>
            <Menu />
        </View>
    );
}

export default TelaDespesa;
