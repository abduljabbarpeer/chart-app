import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress";

const StatusCard = ({ attendance, assignment, evaluation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Akhil's Status</Text>
      <View style={styles.statItem}>
        <CircularProgress percentage={attendance} color="#FFD863" />
        <Text style={styles.statText}>Attendance: {attendance}%</Text>
      </View>
      <View style={styles.statItem}>
        <CircularProgress percentage={assignment} color="#CA77FC" />
        <Text style={styles.statText}>Assignment: {assignment}%</Text>
      </View>
      <View style={styles.statItem}>
        <CircularProgress percentage={evaluation} color="#66BB6A" />
        <Text style={styles.statText}>Evaluation: {evaluation}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default StatusCard;
