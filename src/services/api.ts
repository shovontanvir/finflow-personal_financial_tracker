import type { Transaction } from "../types/transaction";
import { mockTransactions } from "../data/mockData";
import type { ApiResponse } from "../types/api";

const STORAGE_KEY = "finflow_transactions";
const NEXT_ID_KEY = "finflow_transactions_next_id";
const LATENCY = 600;
const SIMULATE_ERROR_CHANCE = 0.25;
const ID_PREFIX = "txn_";
const ID_PATTERN = /^txn_(\d+)$/;

const simulateNetworkError = () => {
  if (Math.random() < SIMULATE_ERROR_CHANCE) {
    throw new Error("500 Internal Server Error: Database connection lost");
  }
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const extractTransactionIdNumber = (id: string): number | null => {
  const match = ID_PATTERN.exec(id);
  if (!match) return null;

  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const getMaxTransactionIdNumber = (data: Transaction[]): number => {
  return data.reduce((max, transaction) => {
    const numericId = extractTransactionIdNumber(transaction.id);
    if (numericId === null) return max;
    return Math.max(max, numericId);
  }, 0);
};

const getStoredNextIdNumber = (): number | null => {
  const raw = localStorage.getItem(NEXT_ID_KEY);
  if (!raw) return null;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 1) return null;
  return parsed;
};

const setStoredNextIdNumber = (nextId: number) => {
  localStorage.setItem(NEXT_ID_KEY, String(nextId));
};

const ensureNextIdNumber = (data: Transaction[]): number => {
  const requiredMinNextId = getMaxTransactionIdNumber(data) + 1;
  const storedNextId = getStoredNextIdNumber();
  const nextId = Math.max(storedNextId ?? 1, requiredMinNextId);

  setStoredNextIdNumber(nextId);
  return nextId;
};

const getNextTransactionId = (data: Transaction[]): string => {
  const nextIdNumber = ensureNextIdNumber(data);
  setStoredNextIdNumber(nextIdNumber + 1);

  // Keep seeded style (txn_001, txn_002, ...), while supporting growth past 3 digits.
  return `${ID_PREFIX}${String(nextIdNumber).padStart(3, "0")}`;
};

const getDB = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTransactions));
    ensureNextIdNumber(mockTransactions);
    return mockTransactions;
  }

  const parsedData: Transaction[] = JSON.parse(data);
  ensureNextIdNumber(parsedData);
  return parsedData;
};

const saveDB = (data: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const apiMethods = {
  // GET: Fetch All
  async get(): Promise<ApiResponse<Transaction[]>> {
    try {
      await delay(LATENCY);
      simulateNetworkError(); // This will randomly trigger the catch block
      const data = getDB();
      return { success: true, message: "Transactions retrieved", data };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      return {
        success: false,
        message: "Operation failed",
        data: null,
        error: errorMessage,
      };
    }
  },

  // POST: Add New (Generates ID)
  async post(body: Omit<Transaction, "id">): Promise<ApiResponse<Transaction>> {
    try {
      await delay(LATENCY + 200);
      simulateNetworkError(); // This will randomly trigger the catch block
      const current = getDB();

      const newTransaction: Transaction = {
        ...body,
        id: getNextTransactionId(current),
      };

      saveDB([newTransaction, ...current]);
      return {
        success: true,
        message: "Transaction created",
        data: newTransaction,
      };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      return {
        success: false,
        message: "Creation failed",
        data: null,
        error: errorMessage,
      };
    }
  },

  // PUT: Update Existing
  async put(
    txn_id: string,
    body: Partial<Transaction>,
  ): Promise<ApiResponse<Transaction>> {
    try {
      await delay(LATENCY);
      simulateNetworkError(); // This will randomly trigger the catch block
      const current = getDB();
      const index = current.findIndex((t) => t.id === txn_id);

      if (index === -1) {
        return {
          success: false,
          message: "Not found",
          data: null,
          error: "ID does not exist",
        };
      }

      const updatedTransaction = { ...current[index], ...body };
      current[index] = updatedTransaction;
      saveDB(current);

      return {
        success: true,
        message: "Transaction updated",
        data: updatedTransaction,
      };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";

      return {
        success: false,
        message: "Update failed",
        data: null,
        error: errorMessage,
      };
    }
  },

  // DELETE: Remove
  async delete(txn_id: string): Promise<ApiResponse<{ id: string }>> {
    try {
      await delay(LATENCY);
      simulateNetworkError(); // This will randomly trigger the catch block
      const current = getDB();
      const initialLength = current.length;
      const filtered = current.filter((t) => t.id !== txn_id);

      if (filtered.length === initialLength) {
        return {
          success: false,
          message: "Delete failed",
          data: null,
          error: "ID not found",
        };
      }

      saveDB(filtered);
      return {
        success: true,
        message: "Transaction deleted",
        data: { id: txn_id },
      };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      return {
        success: false,
        message: "Delete failed",
        data: null,
        error: errorMessage,
      };
    }
  },
};
