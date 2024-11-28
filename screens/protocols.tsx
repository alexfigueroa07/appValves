import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';

const Protocols = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const steps = [
        'Identificar las tuberías afectadas.',
        'Apagar el suministro de agua.',
        'Drenar el sistema de tuberías.',
        'Inspeccionar las tuberías en busca de daños.',
        'Reparar o reemplazar las tuberías dañadas.',
    ];

    const materials = [
        'Llave inglesa',
        'Cinta de teflón',
        'Sellador de fugas',
        'Tuberías de reemplazo',
        'Linterna',
    ];

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Protocolo de Manejo de Fugas</Text>

            <Image
                source={require('../assets/images/fontanero.png')} // Adjust the path to your image
                style={styles.assistantImage}
                resizeMode="contain"
            />

            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    <Text style={styles.stepNumber}>Paso {index + 1}:</Text>
                    <Text style={styles.stepText}>{step}</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.materialsButton} onPress={handleOpenModal}>
                <Text style={styles.materialsButtonText}>Materiales Necesarios</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Materiales Necesarios</Text>
                        {materials.map((material, index) => (
                            <Text key={index} style={styles.materialText}>
                                - {material}
                            </Text>
                        ))}
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4BA69D',
        marginBottom: 20,
        textAlign: 'center',
    },
    assistantImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    stepContainer: {
        backgroundColor: '#D8F0F2',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4BA69D',
    },
    stepText: {
        fontSize: 16,
        color: '#333333',
        marginTop: 5,
    },
    materialsButton: {
        backgroundColor: '#4BA69D',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    materialsButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4BA69D',
        marginBottom: 15,
    },
    materialText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4BA69D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Protocols;
