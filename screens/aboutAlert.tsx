import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native';

const About = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = () => {
        // Here you would handle the form submission logic (e.g., send to a backend)
        console.log('Subject:', subject);
        console.log('Message:', message);
        alert('Message sent!');
        // Reset form fields
        setSubject('');
        setMessage('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                <Image
                    source={require('../assets/images/logo-removebg-preview (1).png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.companyName}>AlertH2O</Text>
                </View>
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
                {/* Contact Us Message */}
                <Text style={styles.contactTitle}>¿Tienes Dudas? Contáctanos:</Text>

                {/* Form */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Asunto"
                        value={subject}
                        onChangeText={setSubject}
                    />
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Mensaje"
                        multiline={true}
                        numberOfLines={4}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>

                {/* Map Placeholder */}
                <View style={styles.mapContainer}>
                    <Text style={styles.mapPlaceholder}>[Mapa aquí]</Text>

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
        backgroundColor: '#ffffff',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,

    },
    logo: {
        width: 150,
        height: 180,
        marginRight: 15,
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4BA69D',
    },
    slogan: {
        fontSize: 16,
        color: '#555',
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4BA69D',
        marginBottom: 10,
        textAlign: 'center'

    },
    sectionText: {
        textAlign: 'justify',
        fontSize: 16,
        color: '#555',
        lineHeight: 22,
    },
    listeningMessage: {
        fontSize: 16,
        color: '#4BA69D',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    contactSection: {
        paddingVertical: 20,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4BA69D',
        marginBottom: 15,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#D8F0F2',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#4BA69D',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapContainer: {
        height: 200,
        backgroundColor: '#D8F0F2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    mapPlaceholder: {
        color: '#888',
        fontSize: 16,
    },
    contactDetails: {
        backgroundColor: '#D8F0F2',
        borderRadius: 10,
        padding: 15,
    },
    contactInfo: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default About;
