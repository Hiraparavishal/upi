import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TransactionItem = ({ tx }) => {
    return (
        <View style={styles.row}>
            <View style={styles.icon} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{tx.receiver}</Text>
                <Text style={styles.sub}>Ref: {tx.ref}</Text>
            </View>
            <Text style={styles.amount}>₹{tx.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#EEE",
        alignItems: "center",
    },
    icon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#007AFF",
        marginRight: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    sub: {
        fontSize: 12,
        color: "#777",
    },
    amount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D80000",
    },
});
