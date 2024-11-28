import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Notification = ({ navigation }: any) => {
    const [visibleNotifications, setVisibleNotifications] = useState({
        problema: true,
        fugaDetectada: true,
        fugaArreglada: true,
    });

    const dismissNotification = (notificationKey: string) => {
        setVisibleNotifications((prevState) => ({
            ...prevState,
            [notificationKey]: false,
        }));
    };

    return (
        <ScrollView>
            {visibleNotifications.problema && (
                <View style={[styles.notificationContainer, styles.problemNotification]}>
                    <Image
                        source={require('../assets/images/alerta.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>
                            Ups, parece que hay un problema en tu empresa
                        </Text>
                        <Text style={styles.message}>
                            Hay algo extraño en el sensor X de la válvula X, échale un vistazo.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.dismissButton}
                        onPress={() => dismissNotification('problema')}
                    >
                        <Text style={styles.dismissText}>OK</Text>
                    </TouchableOpacity>
                </View>
            )}

            {visibleNotifications.fugaDetectada && (
                <View style={[styles.notificationContainer, styles.leakNotification]}>
                    <Image
                        source={require('../assets/images/chapoteo.gif')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>FUGA DETECTADA EN BAÑO</Text>
                    </View>
                    {/* Botones reorganizados */}
                    <View style={styles.singleButtonGroup}>
                        <TouchableOpacity
                            style={styles.smallActionButton}
                            onPress={() => navigation.navigate('Valves')}
                        >
                            <Text style={styles.actionText}>Ir a Válvulas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.smallSecondaryButton}
                            onPress={() => navigation.navigate('HistoryLeaks')}
                        >
                            <Text style={styles.secondaryText}>Registrar Fuga</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {visibleNotifications.fugaArreglada && (
                <View style={[styles.notificationContainer, styles.resolvedNotification]}>
                    <Image
                        source={require('../assets/images/ahorrar-agua.gif')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>Fuga arreglada</Text>
                        <Text style={styles.message}>
                            El departamento de control solucionó la fuga.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.dismissButton}
                        onPress={() => dismissNotification('fugaArreglada')}
                    >
                        <Text style={styles.dismissText}>OK</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 15,
        margin: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    problemNotification: {
        backgroundColor: '#FFEBEE',
    },
    leakNotification: {
        backgroundColor: '#FFFFFF',
    },
    resolvedNotification: {
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#B71C1C',
    },
    dismissButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dismissText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    singleButtonGroup: {
        marginTop: 10,
        alignItems: 'center', // Centra los botones
    },
    smallActionButton: {
        backgroundColor: '#4BA69D',
        borderRadius: 8,
        paddingVertical: 6, // Más pequeño
        paddingHorizontal: 15, // Reduce el ancho
        marginBottom: 10, // Espaciado entre botones
        alignItems: 'center',
    },
    smallSecondaryButton: {
        backgroundColor: '#B3E5FC',
        borderRadius: 8,
        paddingVertical: 6, // Más pequeño
        paddingHorizontal: 15, // Reduce el ancho
        marginBottom: 10,
        alignItems: 'center',
    },
    actionText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12, // Texto más pequeño
    },
    secondaryText: {
        color: '#01579B',
        fontWeight: 'bold',
        fontSize: 12, // Texto más pequeño
    },
    callButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    callText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default Notification;
