import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebaseConfig';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('player'); // 'player' or 'business'

    const handleLogin = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in!');
        } catch (error){
            alert(error.message);
        }
        // console.log({ email, role });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ProFutsal</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Password'
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.roleContainer}>
                <TouchableOpacity onPress={()=> setRole('Player')}>
                    <Text style={[styles.roleButton, role == 'player' && styles.activeRole]}>Player</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setRole('Business')}>
                    <Text style={[styles.roleButton, role == 'Business' && styles.activeRole]}>Business</Text>
                </TouchableOpacity>
            </View>
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                <Text style={styles.ling}>Don't have an account?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { fontSize: 32, marginBottom: 24, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
    link: { color: 'blue', marginTop: 16, textAlign: 'center' },
    roleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    roleButton: { padding: 10, borderRadius: 5 },
    activeRole: { fontWeight: 'bold', textDecorationLine: 'underline' }
  });

