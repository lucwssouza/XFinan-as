import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Menu from './components/menu.js';
import axios from 'axios';
import styles from './styles/global.js';
import { formatarParaReal } from './components/format.js';
import { useFocusEffect } from '@react-navigation/native';

function TelaDespesasCategoria({ route, navigation }) {
    const { users } = route.params;
    const { categoria, refresh } = route.params;
    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0);
    let nomecategoria = categoria.categoria;
    const userId = users.idusuario;

    const fetchData = useCallback(() => {
        axios.get(`http://172.16.42.90/XFinancas/select_despesas/?nomecategoria=${nomecategoria}&userId=${userId}`)
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setDespesas(response.data);
                    setTotal(response.data.length);
                } else {
                    setDespesas([]);
                    setTotal(0);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar despesas:', error);
                Alert.alert("Erro", 'Ocorreu um erro ao obter as despesas.');
            });
    }, [nomecategoria, userId]);

    useFocusEffect(
        useCallback(() => {
            if (refresh) {
                fetchData();
            }
        }, [refresh])
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <View style={styles.container}>
            <View style={styles.headerDespesas}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require("./assets/seta.png")} style={styles.backDespesas} />
                </TouchableOpacity>
                <Text style={styles.headerTitleDespesas}>
                    Despesas com
                </Text>
                <Text style={styles.despesasTitle}>{categoria.categoria}</Text>
                <View style={styles.headerTotalDespesas}>
                    <Text style={styles.totalDespesas}>Total de despesas</Text>
                    <Text style={styles.priceDespesas}>{categoria.total_despesas}</Text>
                </View>
            </View>
            <SafeAreaView style={styles.scrollDespesas}>
                <ScrollView>
                    <View style={styles.mainMetas}>
                        <View style={styles.containerCardDespesas}>
                            {despesas.length > 0 ? (
                                despesas.map(despesa => (
                                    <TouchableOpacity key={despesa.iddespesas} style={styles.despesas}>
                                        <View style={styles.statusDespesas}>
                                            <Text>{despesa.nome}</Text>
                                            <Text style={styles.dataDespesas}>Venc. {despesa.data_vencimento}</Text>
                                        </View>
                                        <View style={styles.dinheiroDespesas}>
                                            <Text>{formatarParaReal(despesa.valor)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.noDataText}>Nenhuma despesa encontrada para esta categoria.</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <TouchableOpacity style={styles.containerAddMetas} onPress={() => navigation.navigate('TelaCadDespesas', { categoria, users })}>
                <Image source={require("./assets/add.png")} style={{ width: 50, height: 50, tintColor: '#F98E1E' }} />
            </TouchableOpacity>
            <Menu />
        </View>
    );
}

export default TelaDespesasCategoria;
