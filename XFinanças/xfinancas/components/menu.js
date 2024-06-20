import React, { useState } from "react";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import styles from '../styles/global.js';
import { useNavigation } from "@react-navigation/native";
import { useUser } from '../UserContext'; // Importe o contexto de usuário

function Menu() {
    const navigation = useNavigation();
    const { user } = useUser(); // Obtenha o usuário do contexto de usuário
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.navigate('TelaHome', { users: user })}>
                <Image source={require("../assets/home.png")} style={styles.iconsMenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>
                <Image source={require("../assets/controle.png")} style={styles.iconsMenu} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require("../assets/user.png")} style={styles.iconsMenu} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={closeModal}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('TelaLogin');
                            closeModal();
                        }}>
                            <Image source={require("../assets/sair.png")} style={styles.modalOption} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

export default Menu;
