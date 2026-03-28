import type { Transaction } from "../types/transaction";
import { mockTransactions } from "../data/mockData";
import type { ApiResponse } from "../types/api";

const STORAGE_KEY = "finflow_transactions";
const LATENCY = 600;
const SIMULATE_ERROR_CHANCE = 0.25;

const simulateNetworkError = () => {
  if (Math.random() < SIMULATE_ERROR_CHANCE) {
    throw new Error("500 Internal Server Error: Database connection lost");
  }
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getDB = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTransactions));
    return mockTransactions;
  }
  return JSON.parse(data);
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

      // REAL GENERATION: Create the ID here in the "Service"
      const newTransaction: Transaction = {
        ...body,
        id: `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
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
