import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { PREDICTIONS } from '../data/predictions';
import MainLayout from '../components/layout/MainLayout';
import { useNanaimoContext } from '../store/context';

const Home = () => {
  const { store } = useNanaimoContext();
  
  // Safely access favoritePredictions with fallback to empty array
  const favoritePredictions = PREDICTIONS.filter(pred => 
    store.favoritePredictions?.includes(pred.id) || false
  );

  return (
    <MainLayout>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Your Favorite Places</Text>
          </View>
          <Text style={styles.sectionSubtext}>Tap to revisit collection</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Favorite Predictions</Text>
          </View>
          <Text style={styles.sectionSubtext}>
            Tap to view all saved predictions
          </Text>
          
          {(favoritePredictions?.length || 0) > 0 ? (
            <View style={styles.predictionsContainer}>
              {favoritePredictions.map((prediction) => (
                <View key={prediction.id} style={styles.predictionCard}>
                  <Text style={styles.predictionText}>{prediction.text}</Text>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favorite predictions yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSubtext: {
    fontSize: 16,
    color: '#666',
    marginLeft: 32,
    marginBottom: 16,
  },
  predictionsContainer: {
    marginLeft: 32,
    gap: 12,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  predictionText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  favoriteIcon: {
    fontSize: 16,
    marginLeft: 12,
  },
  emptyContainer: {
    marginLeft: 32,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});
