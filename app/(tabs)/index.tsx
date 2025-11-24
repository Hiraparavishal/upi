import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import upiData from "../upiData.json";
import { BankCard } from "../BankCard";
import { TransactionItem } from "../TransactionItem";
import {
  groupTransactionsByDate,
  getTodayLimitLeft,
  BankObject,
} from "../dateUtils";

export default function HomeScreen() {
  const [selectedBank, setSelectedBank] = useState("HDFC");

  const bankList = Object.keys(upiData);

  // Pre-calc today limits for ALL banks
  const allBankLimits = bankList.reduce((acc, bank) => {
    acc[bank] = getTodayLimitLeft(upiData[bank], 100000);
    return acc;
  }, {} as Record<string, number>);

  // Group transactions for the selected bank
  const groupedData = useMemo(
    () => groupTransactionsByDate(upiData[selectedBank] as BankObject),
    [selectedBank]
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <Text style={styles.header}>Transactions</Text>

      {/* Bank Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bankList.map((bank) => (
          <BankCard
            key={bank}
            bank={bank}
            isActive={bank === selectedBank}
            limitLeft={allBankLimits[bank]}
            onPress={() => setSelectedBank(bank)}
          />
        ))}
      </ScrollView>

      {/* Sort Box */}
      <View style={styles.sortBox}>
        <Text style={styles.sortText}>Sorted by date (Newest first)</Text>
      </View>

      {/* Transactions by date */}
      {Object.keys(groupedData).map((date) => (
        <View key={date} style={{ marginTop: 25 }}>
          <Text style={styles.sectionTitle}>{date}</Text>

          {groupedData[date].map((tx, index) => (
            <TransactionItem key={index} tx={tx} />
          ))}
        </View>
      ))}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  sortBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
});
