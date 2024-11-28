import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/LOGO alert h2o.png')}
                style={styles.logo}
            />


            {/* Menú de Opciones */}
            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')} // Cambia 'Register' al nombre de tu pantalla de nuevo usuario
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                <Text style={styles.link}>
                    ¿Ya tienes una cuenta?
                </Text>
                <TouchableOpacity
                    style={styles.buttonSecundary}
                    onPress={() => navigation.navigate('Login')} // Cambia 'Login' al nombre de tu pantalla de inicio de sesión
                >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 320,
        height: 150,
        marginBottom: 0,
    },

    description: {
        fontSize: 14,
        color: '#4A4A4A',
        textAlign: 'center',
        marginBottom: 30,
    },
    menu: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#404040',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonSecundary: {
        backgroundColor: '#04BFBF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 10,
    },
});
