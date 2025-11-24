export interface Transaction {
    receiver: string;
    amount: number;
    ref: string;
    txDate?: string;
}

export interface DateEntry {
    totalTransactions: number;
    totalAmountDebited: number;
    transactions: Transaction[];
}

export type BankObject = Record<string, DateEntry>;

/* Calculate remaining limit for today */
export function getTodayLimitLeft(bankObj: BankObject, limit: number = 1000) {
    const todayKey = new Date().toISOString().split("T")[0];

    const todayData = bankObj[todayKey];

    if (!todayData) return limit;

    const totalToday = todayData.transactions.reduce(
        (sum, tx) => sum + Number(tx.amount),
        0
    );

    const remaining = limit - totalToday;
    return remaining < 0 ? 0 : remaining;
}

/* Group by date - newest first */
export function groupTransactionsByDate(bankObj: BankObject) {
    const groups: Record<string, Transaction[]> = {};

    const sortedDates = Object.keys(bankObj).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    sortedDates.forEach((dateKey) => {
        const dayData = bankObj[dateKey];

        groups[dateKey] = dayData.transactions.map((tx) => ({
            ...tx,
            txDate: dateKey,
        }));
    });

    return groups;
}
