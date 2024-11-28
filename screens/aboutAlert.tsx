import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const About = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = () => {
        console.log('Subject:', subject);
        console.log('Message:', message);
        alert('Mensaje enviado con éxito');
        setSubject('');
        setMessage('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                <Image
                    source={require('../assets/images/LOGO alert h2oiso.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.companyName}>AlertH2O</Text>
            </View>

            {/* Who We Are Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>¿Quiénes Somos?</Text>
                <Text style={styles.sectionText}>
                    En 'AlertH2O', somos pioneros en la innovación para la gestión inteligente del agua.
                    Nuestra misión es proporcionar soluciones tecnológicas avanzadas que no solo optimicen el uso del agua,
                    sino que también promuevan su cuidado y conservación.
                </Text>
            </View>

            {/* Listening Message */}
            <Text style={styles.listeningMessage}>
                ALERT H2O quiere escucharte. Recuerda que estamos a tu servicio.
            </Text>

            {/* Contact Section */}
            <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>¿Tienes Dudas? Contáctanos:</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Asunto"
                        value={subject}
                        onChangeText={setSubject}
                        placeholderTextColor="#737373"
                    />
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Mensaje"
                        multiline
                        numberOfLines={4}
                        value={message}
                        onChangeText={setMessage}
                        placeholderTextColor="#737373"
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>

                {/* Map Section */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 21.846033,
                            longitude: -102.722866,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 21.846033, longitude: -102.722866 }}
                            title="AlertH2O"
                            description="Nuestra ubicación"
                        />
                    </MapView>
                </View>

                {/* Contact Details */}
                <View style={styles.contactDetails}>
                    <Text style={styles.contactInfo}>
                        <Text style={styles.bold}>Ubicación:</Text> Carretera Tepetate No. 102 Col. El Salitre, Calvillo CP.20680 Ags.
                    </Text>
                    <Text style={styles.contactInfo}>
                        <Text style={styles.bold}>Horario:</Text> Lunes a Viernes, 5 AM - 2 PM
                    </Text>
                    <Text style={styles.contactInfo}>
                        <Text style={styles.bold}>Teléfono:</Text> +52 449528613
                    </Text>
                    <Text style={styles.contactInfo}>
                        <Text style={styles.bold}>Correo:</Text> alerthh2o@gmail.com
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 15,
    },
    companyName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#04BFBF',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#04BFBF',
        marginBottom: 10,
    },
    sectionText: {
        textAlign: 'justify',
        fontSize: 16,
        color: '#424242',
        lineHeight: 24,
    },
    listeningMessage: {
        fontSize: 16,
        color: '#04BFBF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    contactSection: {
        marginBottom: 20,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#04BFBF',
        marginBottom: 15,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 4,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#B0BEC5',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#424242',
    },
    submitButton: {
        backgroundColor: '#04BFBF',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapContainer: {
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    map: {
        flex: 1,
    },
    contactDetails: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 4,
    },
    contactInfo: {
        fontSize: 16,
        color: '#424242',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
        color: '#04BFBF',
    },
});

export default About;
