import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const UserRouteDetails = ({ routeDetails }) => {
  if (!routeDetails) return null;

  const formatDistance = (meters) => {
    const feet = Math.round(meters * 3.28084);
    return `${Math.round(feet/100)/10}`;
  };

  const formatDuration = (seconds) => {
    return `${Math.ceil(seconds / 60)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏃‍♂️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.value}>{formatDistance(routeDetails.distance)}</Text>
            <Text style={styles.unit}>mi</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⏱️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.value}>{formatDuration(routeDetails.duration)}</Text>
            <Text style={styles.unit}>min</Text>
          </View>
        </View>
      </View>

      {routeDetails.legs?.[0]?.summary && (
        <View style={styles.routeNameContainer}>
          <Text style={styles.routeName}>
            {routeDetails.legs[0].summary}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 73, 94, 0.95)',
    borderRadius: 15,
    padding: 12,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 4,
  },
  icon: {
    fontSize: 16,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  value: {
    color: '#ECF0F1',
    fontSize: 20,
    fontWeight: '600',
  },
  unit: {
    color: '#BDC3C7',
    fontSize: 14,
    marginLeft: 2,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  routeNameContainer: {
    backgroundColor: 'rgba(52, 73, 94, 0.95)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  routeName: {
    color: '#ECF0F1',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default UserRouteDetails;
