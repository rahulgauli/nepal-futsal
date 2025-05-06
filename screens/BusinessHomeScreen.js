import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function BusinessHomeScreen({ navigation }) {
  const [grounds, setGrounds] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchGrounds = async () => {
      try {
        const q = query(
          collection(db, 'futsalRequests'),
          where('businessId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGrounds(items);
      } catch (error) {
        Alert.alert('Error fetching requests', error.message);
      }
    };

    fetchGrounds();
  }, [user]);

  const handleDeploy = (ground) => {
    Alert.alert(`Deploying "${ground.groundName}"...`, "This is where deployment logic would go.");
    // You can later integrate scheduling, slot bookings, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Futsal Requests</Text>

      <FlatList
        data={grounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.groundName}</Text>
            <Text>Status: {item.status}</Text>
            {item.status === 'approved' && (
              <Button title="Deploy" onPress={() => handleDeploy(item)} />
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No futsal grounds submitted yet.</Text>}
      />

      <Button title="Request New Ground" onPress={() => navigation.navigate('Add Ground')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, marginBottom: 12, borderWidth: 1, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 32, fontStyle: 'italic' }
});
