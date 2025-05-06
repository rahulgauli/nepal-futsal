import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';


export default function AddFutsalGroundScreen({ navigation }){
    const [ groundName, setGroundName ] = useState('');
    const [ location, setLocation ] = useState('');

    const handleSubmit = async () => {
        if (!groundName || !location){
            Alert.alert('Please fill in all fields');
            return;
        }

        try {
            const user = auth.currentUser;

            await addDoc(collection(db, 'futsal'), {
                groundName,
                location,
                businessID: user.uid,
                businessEmail: user.email,
                status: 'pending',
                submittedAt: Timestamp.now()
            });

            Alert.alert('Request submitted Successfully!')
            navigation.goBack();
        } catch (error){
            Alert.alert('Error Submitting request:', error.message)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Futsal Ground</Text>

            <TextInput
                placeholder='Ground Name'
                value={groundName}
                onChangeText={setGroundName}
                style={styles.input}
            />
            <TextInput
                placeholder='Location'
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />

            <Button title='Submit Request' onPress={handleSubmit}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 16, padding: 10, borderRadius: 5 }
  });