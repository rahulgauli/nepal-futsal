import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('player');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        role,
        createdAt: new Date()
      });

      alert('Account created!');
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }

    console.log({ name, email, role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        placeholder={role === 'business' ? "Business Name" : "Full Name"}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder='Email'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        placeholder='Password'
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        textContentType="oneTimeCode"
        autoComplete="off"
      />

      <TextInput
        placeholder='Confirm Password'
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="oneTimeCode"
        autoComplete="off"
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => setRole('player')}>
          <Text style={[styles.roleButton, role === 'player' && styles.activeRole]}>Player</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('business')}>
          <Text style={[styles.roleButton, role === 'business' && styles.activeRole]}>Business</Text>
        </TouchableOpacity>
      </View>

      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
