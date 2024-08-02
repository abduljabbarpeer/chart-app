import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import IconButton from "./UI/IconButton";
import StatsCard from "./UI/StatsCard";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const { width, height } = Dimensions.get("window");

const generateWeekLabels = (numWeeks) => {
  const labels = [];
  for (let i = 1; i <= numWeeks; i++) {
    labels.push(`Week ${i}`);
  }
  return labels;
};

const weekLabels = generateWeekLabels(7);

const akhilData = {
  attendance: [90, 85, 87, 88, 92, 95, 97],
  assignment: [80, 82, 81, 84, 88, 90, 93],
  evaluation: [85, 87, 86, 89, 91, 94, 96],
  salaryPrediction: [10, 8, 12, 14, 16, 18, 36],
};

const userData = {
  attendance: [75, 78, 76, 77, 79, 80, 82],
  assignment: [70, 72, 71, 73, 74, 76, 78],
  evaluation: [65, 67, 66, 68, 69, 70, 72],
  salaryPrediction: [4, 6, 6, 10, 12, 7, 14],
};

const data = {
  labels: weekLabels,
  datasets: [
    {
      label: "Akhil's Status",
      data: akhilData.salaryPrediction,
      borderColor: "#FFD863",
      backgroundColor: "#FFD863",
      fill: false,
      pointRadius: 8,
      pointHoverRadius: 10,
      pointBackgroundColor: "#f1e3ae",
      pointBorderColor: "#FBE38E",
    },
    {
      label: "You",
      data: userData.salaryPrediction,
      borderColor: "#CA77FC",
      backgroundColor: "#CA77FC",
      fill: false,
      pointRadius: 8,
      pointHoverRadius: 10,
      pointBackgroundColor: "#cbc5f5",
      pointBorderColor: "#B1A5FF",
    },
  ],
};

const ModalComponent = ({ isVisible, onClose }) => {
  const [tooltipData, setTooltipData] = useState({
    visible: false,
    x: 0,
    y: 0,
    indexOfItemClicked: null,
    labelOfItemClicked: null,
    dataSelectedOfWhichUser: null,
  });

  const handleClick = (event, elements) => {
    // console.log(event);

    if (
      event.chart &&
      event.chart.tooltip &&
      event.chart.tooltip.dataPoints &&
      event.chart.tooltip.dataPoints.length > 0
    ) {
      setTooltipData({
        visible: true,
        x: event.chart.tooltip.dataPoints[0].parsed.x,
        y: event.chart.tooltip.dataPoints[0].parsed.y,
        indexOfItemClicked: event.chart.tooltip.dataPoints[0].dataIndex,
        labelOfItemClicked: event.chart.tooltip.dataPoints[0].label,
        dataSelectedOfWhichUser:
          event.chart.tooltip.dataPoints[0].dataset.label === "Akhil's Status"
            ? akhilData
            : userData,
      });
    } else {
      setTooltipData((prev) => ({ ...prev, visible: false }));
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + " LPA";
          },
        },
      },
    },
    onClick: handleClick,
  };

  const attendanceDataToDisplay =
    tooltipData?.dataSelectedOfWhichUser?.attendance[
      tooltipData?.indexOfItemClicked
    ];
  const assignmentDataToDisplay =
    tooltipData?.dataSelectedOfWhichUser?.assignment[
      tooltipData?.indexOfItemClicked
    ];
  const evaluationDataToDisplay =
    tooltipData?.dataSelectedOfWhichUser?.evaluation[
      tooltipData?.indexOfItemClicked
    ];
  // const salaryPredictionDataToDisplay =
  //   tooltipData?.dataSelectedOfWhichUser?.salaryPrediction[
  //     tooltipData?.indexOfItemClicked
  //   ];
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <View style={styles.leftSideStats}>
            {attendanceDataToDisplay &&
              assignmentDataToDisplay &&
              evaluationDataToDisplay && (
                <StatsCard
                  attendance={attendanceDataToDisplay}
                  assignment={assignmentDataToDisplay}
                  evaluation={evaluationDataToDisplay}
                />
              )}
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#FBE38E" }]}
              />
              <Text style={styles.legendText}>Akhil (Alumni)</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#9A89FF" }]}
              />
              <Text style={styles.legendText}>You</Text>
            </View>
          </View>
          <IconButton
            icon="close"
            onPress={onClose}
            color="#757575"
            size={28}
          />
        </View>
        {/* Chart container section */}
        <View style={styles.chartContainer}>
          <Line id="chart" data={data} options={options} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.8,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  leftSideStats: {
    alignItems: "flex-start",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 40,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
  chartContainer: {
    flex: 1,
    width: "100%",
  },
});

export default ModalComponent;
