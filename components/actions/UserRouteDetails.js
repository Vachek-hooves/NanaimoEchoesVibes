import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const UserRouteDetails = ({routeDetails}) => {
  if (!routeDetails) return null;

  // Convert distance to km if > 1000m, otherwise show in meters
  const formatDistance = meters => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  };

  // Convert duration from seconds to minutes
  const formatDuration = seconds => {
    const minutes = Math.round(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>
            {formatDistance(routeDetails.distance)}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>
            {formatDuration(routeDetails.duration)}
          </Text>
        </View>
      </View>
      {routeDetails.legs?.[0]?.summary && (
        <Text style={styles.summary}>via {routeDetails.legs[0].summary}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    minWidth: 180,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  label: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default UserRouteDetails;
