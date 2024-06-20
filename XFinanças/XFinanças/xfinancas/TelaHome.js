import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/global.js';
import Menu from "./components/menu.js";
import { formatarParaReal } from "./components/format.js";
import { useUser } from './UserContext';

const { width: viewportWidth } = Dimensions.get('window');

function TelaHome({ route, navigation }) {
    const { user, setUser } = useUser();
    const { users } = route.params || { users: user };

    useEffect(() => {
        if (!user && users) {
            setUser(users);
        }
    }, [users]);

    const [categories, setCategories] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [despesas, setDespesas] = useState([]);

    const fetchData = useCallback(() => {
        const userId = users.idusuario;

        console.log("id: " + userId);

        fetch(`http://172.16.42.90/XFinancas/select_categorias/?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Erro ao obter categorias:', error);
            });

        fetch(`http://172.16.42.90/XFinancas/select_saldo/?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setSaldo(data.saldo);
                } else {
                    console.error('Erro ao obter saldo:', data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao obter saldo:', error);
            });

        fetch(`http://172.16.42.90/XFinancas/select_despesas_categoria/?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                setDespesas(data);
            })
            .catch(error => {
                console.error('Erro ao obter despesas recentes:', error);
            });
    }, [users]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.cardCarrosel}
                key={index}
                onPress={() => navigation.navigate('TelaDespesasCategoria', { categoria: item, users })}
            >
                <Text style={styles.txtCard}>{item.categoria}</Text>
                <Image source={{ uri: item.imagem }} style={styles.iconsCarrosel} />
                <Text style={styles.txtCard}>{formatarParaReal(item.total_valor_despesas)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerHome}>
                <Text style={styles.txtSaldo}>
                    Saldo da conta
                </Text>
                <Text style={styles.saldo}>
                    {formatarParaReal(saldo)}
                </Text>
            </View>
            <SafeAreaView style={styles.scroll}>
                <ScrollView>
                    <View style={styles.mainHome}>
                        <View style={styles.mainContent}>
                            <TouchableOpacity style={styles.addSaldo} onPress={() => navigation.navigate('TelaAddSaldo', { users })}>
                                <Text style={styles.txtAddSaldo}>Adicionar saldo</Text>
                            </TouchableOpacity>
                            <Text style={styles.titlesMain}>
                                &nbsp;&nbsp; Gastos por categoria
                            </Text>
                            <View style={styles.carrosel}>
                                <Carousel
                                    layout={"default"}
                                    data={categories}
                                    sliderWidth={viewportWidth}
                                    itemWidth={viewportWidth * 0.3}
                                    renderItem={renderItem}
                                    inactiveSlideScale={0.95}
                                    contentContainerCustomStyle={styles.carouselContentContainer}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnAddCategorias} onPress={() => navigation.navigate('TelaCadCategoria', { users })}>
                                <Image source={require("./assets/add.png")} style={{ width: 50, height: 50, tintColor: '#F98E1E' }} />
                            </TouchableOpacity>
                            <Text style={styles.titlesMain}>
                                Despesas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Text>
                            <View style={styles.containerDespesas}>
                                {Array.isArray(despesas) && despesas.length > 0 ? (
                                    despesas.map((despesa, index) => (
                                        <TouchableOpacity key={index} style={styles.despesas} onPress={() => navigation.navigate('TelaDespesa', { despesa: despesas[index], users, saldo })}>
                                            <Image source={{ uri: despesa.foto }} style={styles.iconDespesas} />
                                            <View style={styles.statusDespesas}>
                                                <Text>{despesa.nome}</Text>
                                                <Text style={styles.dataDespesas}>Venc. {despesa.data_vencimento}</Text>
                                            </View>
                                            <View style={styles.dinheiroDespesas}>
                                                <Text>{formatarParaReal(despesa.valor)}</Text>
                                                <Text style={styles.descDespesas}>{despesa.tipo_pagamento}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.noDataText}>Nenhuma despesa encontrada.</Text>
                                )}
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Menu />
        </View>
    );
}

export default TelaHome;