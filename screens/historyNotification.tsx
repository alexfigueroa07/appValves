import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Notification = () => {
    // State to keep track of which notifications are visible
    const [visibleNotifications, setVisibleNotifications] = useState({
        problema: true,
        fugaDetectada: true,
        fugaArreglada: true,
    });

    // Function to hide a notification
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
                        source={require('../assets/images/alerta.png')} // Replace with your logo path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>Ups, parece que hay un problema en tu empresa</Text>
                        <Text style={styles.message}>Hay algo extraño en el sensor X de la válvula X, échale un vistazo.</Text>
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
                        source={require('../assets/images/chapoteo.gif')} // Replace with your logo path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>FUGA DETECTADA</Text>
                        <Text style={styles.message}>Revisa la fuga que se encuentra en almacen.</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.dismissButton}
                        onPress={() => dismissNotification('fugaDetectada')}
                    >
                        <Text style={styles.dismissText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callButton}>
                        <Text style={styles.callText}>LLAMAR</Text>
                    </TouchableOpacity>
                </View>
            )}
            {visibleNotifications.fugaArreglada && (
                <View style={[styles.notificationContainer, styles.resolvedNotification]}>
                    <Image
                        source={require('../assets/images/ahorrar-agua.gif')} // Replace with your logo path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.messageContainer}>
                        <Text style={styles.title}>Fuga arreglada</Text>
                        <Text style={styles.message}>El departamento de control soluciono la fuga.</Text>
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
        elevation: 5, // For Android shadow
    },
    problemNotification: {
        backgroundColor: '#FFEBEE', // Red background for the problem notification
    },
    leakNotification: {
        backgroundColor: '#FFFFFF', // White background for the leak detected notification
    },
    resolvedNotification: {
        backgroundColor: '#FFFFFF', // White background for the resolved notification
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
