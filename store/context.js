import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLACES } from '../data/places';
import { FACTS } from '../data/facts';

export const StoreContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState({
    places: [],
    facts: [],
    favoritePredictions: [],
    favoriteSpots: [],
    userData: null,
  });

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Get stored data
      const [
        storedPlaces,
        storedFacts,
        storedFavorites,
        storedUserData
      ] = await Promise.all([
        AsyncStorage.getItem('places'),
        AsyncStorage.getItem('facts'),
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('userData')
      ]);

      // Initialize places
      let places = storedPlaces ? JSON.parse(storedPlaces) : PLACES;
      if (!storedPlaces) {
        await AsyncStorage.setItem('places', JSON.stringify(PLACES));
      }

      // Initialize facts
      let facts = storedFacts ? JSON.parse(storedFacts) : FACTS;
      if (!storedFacts) {
        await AsyncStorage.setItem('facts', JSON.stringify(FACTS));
      }

      // Initialize favorites
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Initialize user data
      let userData = storedUserData ? JSON.parse(storedUserData) : null;

      setStore({
        places,
        facts,
        favorites,
        userData,
      });
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const updateFavorites = async (placeId) => {
    try {
      const newFavorites = store.favorites.includes(placeId)
        ? store.favorites.filter(id => id !== placeId)
        : [...store.favorites, placeId];

      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      
      setStore(prev => ({
        ...prev,
        favorites: newFavorites
      }));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const updateUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setStore(prev => ({
        ...prev,
        userData
      }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const updateFavoritePredictions = async (predictionId) => {
    try {
      const currentFavorites = store.favoritePredictions || [];
      const newFavorites = currentFavorites.includes(predictionId)
        ? currentFavorites.filter(id => id !== predictionId)
        : [...currentFavorites, predictionId];
      
      await AsyncStorage.setItem('favoritePredictions', JSON.stringify(newFavorites));
      
      setStore(prev => ({
        ...prev,
        favoritePredictions: newFavorites
      }));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const updateFavoriteSpots = async (spotId) => {
    try {
      const currentFavorites = store.favoriteSpots || [];
      const newFavorites = currentFavorites.includes(spotId)
        ? currentFavorites.filter(id => id !== spotId)
        : [...currentFavorites, spotId];
      
      await AsyncStorage.setItem('favoriteSpots', JSON.stringify(newFavorites));
      
      setStore(prev => ({
        ...prev,
        favoriteSpots: newFavorites
      }));
    } catch (error) {
      console.error('Error updating favorite spots:', error);
    }
  };

  const contextValue = {
    store,
    setStore,
    updateFavorites,
    updateUserData,
    updateFavoritePredictions,
    updateFavoriteSpots,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useNanaimoContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useNanaimoContext must be used within a NanaimoStore');
  }
  return context;
};

export default ContextProvider;
