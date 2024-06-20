import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import styles from './styles/global.js';
import Menu from "./components/menu.js";

function TelaCadDespesas({ route, navigation }) {
    const { users } = route.params;
    const { categoria } = route.params;
    const [nome, setNome] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dataVencimento, setDataVencimento] = useState(new Date());
    const [valor, setValor] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    console.log(categoria.categoria);
    console.log("O ID: " + users.idusuario);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dataVencimento;
        setShowDatePicker(Platform.OS === 'ios');
        setDataVencimento(currentDate);
    };

    const cadastrarDespesa = () => {
        if (nome.trim() !== '' && observacao.trim() !== '' && dataVencimento && valor.trim() !== '') {
            const token = 'Q!W@ee344%%R';
            axios.post('http://172.16.42.90/XFinancas/cadastro_despesas/', {
                token,
                nome,
                observacao,
                dataVencimento: dataVencimento.toISOString().split('T')[0],
                valor,
                categoriaNome: categoria.categoria,
                userId: users.idusuario
            })
                .then(response => {
                    const data = response.data;
                    if (data.success) {
                        console.log(categoria.nome);
                        Alert.alert("Sucesso", "Despesa criada com sucesso!");
                        navigation.navigate('TelaDespesasCategoria', { categoria, users, refresh: true });
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerCategoria}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("./assets/seta.png")} style={styles.backCategoria} />
                </TouchableOpacity>
                <Text style={styles.titleCadDespesas}>
                    Cadastro de despesas
                </Text>
            </View>
            <View style={styles.formCategoria}>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Nome</Text>
                    <TextInput style={styles.inputCategoria}
                        placeholder='Digite o nome da sua despesa'
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>OBS&nbsp;&nbsp;&nbsp;</Text>
                    <TextInput style={styles.inputCategoria}
                        placeholder='Digite uma observação'
                        value={observacao}
                        onChangeText={(text) => setObservacao(text)}
                    />
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>DataV</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.inputCategoria}>
                            {dataVencimento.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dataVencimento}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>
                <View style={styles.inputCategoriaContainer}>
                    <Text>Valor&nbsp;&nbsp;</Text>
                    <TextInput
                        style={styles.inputCategoria}
                        placeholder='Digite o valor da despesa'
                        keyboardType="numeric"
                        value={valor}
                        onChangeText={text => {
                            const formattedValue = text.replace(/[^0-9]/g, '');
                            setValor(formattedValue);
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btnCategoria} onPress={cadastrarDespesa}>
                <Text style={styles.btnText}>Criar despesa</Text>
            </TouchableOpacity>
            <Menu />
        </View>
    )
}

export default TelaCadDespesas;
