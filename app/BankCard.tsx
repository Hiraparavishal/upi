import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const BankCard = ({ bank, isActive, onPress, limitLeft }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, isActive && styles.active]}
        >
            <Text style={[styles.bankName, isActive && styles.activeText]}>
                {bank}
            </Text>

            <Text style={styles.limitText}>Today Limit Left: ₹{limitLeft}</Text>

            <Text style={styles.smallText}>Tap to view transactions</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 160,
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDD",
        marginRight: 12,
    },
    active: {
        borderColor: "#007AFF",
        backgroundColor: "#EAF2FF",
    },
    bankName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
    },
    activeText: {
        color: "#007AFF",
    },
    smallText: {
        fontSize: 12,
        marginTop: 8,
        color: "#444",
    },
    limitText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#007AFF",
    },
});
