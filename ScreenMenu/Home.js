import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/ui/Header';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      {/* <SafeAreaView style={styles.container}> */}
      <Header />
      <View style={styles.content}>
        <TouchableOpacity style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Your Favorite Places</Text>
          </View>
          <Text style={styles.sectionSubtext}>Tap to revisit collection</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Favorite Predictions</Text>
          </View>
          <Text style={styles.sectionSubtext}>
            Tap to view all saved predictions
          </Text>
        </TouchableOpacity>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsIcon: {
    fontSize: 24,
  },
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
  },
});
