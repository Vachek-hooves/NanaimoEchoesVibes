import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
} from 'react-native';
import {useNanaimoContext} from '../store/context';
import MainLayout from '../components/layout/MainLayout';
import CollectionItemModal from '../components/actions/CollectionItemModal';
import UpdateLayout from '../components/layout/UpdateLayout';
import Header from '../components/ui/Header';

const Collection = () => {
  const {store} = useNanaimoContext();
  const [activeTab, setActiveTab] = useState('City Facts');
  const {userData} = store;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleShare = async item => {
    try {
      await Share.share({
        message: `${item.header}\n\n${item.text}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderItem = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemCard}
      onPress={() => handleItemPress(item)}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.header}</Text>
        <Text style={styles.itemDescription}>{item.text}</Text>
      </View>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={e => {
          e.stopPropagation();
          handleShare(item);
        }}>
        <Text style={styles.shareIcon}>➔</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <UpdateLayout>
      {/* <MainLayout> */}
      <Header />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>✨ Your Nanaimo Collections</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'City Facts' && styles.activeTab]}
            onPress={() => setActiveTab('City Facts')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'City Facts' && styles.activeTabText,
              ]}>
              City Facts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Places' && styles.activeTab]}
            onPress={() => setActiveTab('Places')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Places' && styles.activeTabText,
              ]}>
              Places
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.itemsList}
          showsVerticalScrollIndicator={false}>
          {activeTab === 'City Facts'
            ? store.facts.map(fact => renderItem(fact))
            : store.places.map(place => renderItem(place))}
        </ScrollView>
      </View>
      <CollectionItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
      />
      {/* </MainLayout> */}
    </UpdateLayout>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#DC143C',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '500',
  },
  itemsList: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 5,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  shareButton: {
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  shareIcon: {
    fontSize: 20,
    color: '#666',
  },
});
