// src/app/hooks/useStocks.ts
import useSWR, { mutate as globalMutate } from "swr";
import { del, get, patch, put } from "./api";
import type { StockItem, Owner } from "../../types/stock";

const STOCK_KEY = "/stock";

export function useStocks(options?: { intervalMs?: number }) {
    const interval = options?.intervalMs ?? 2000; // auto-refresh every 2s

    const { data, error, isLoading, mutate } = useSWR<StockItem[]>(
        STOCK_KEY,
        () => get<StockItem[]>("/stock"),
        {
            refreshInterval: interval,
            revalidateOnFocus: true,
            keepPreviousData: true,
        }
    );

    async function addStock(input: Omit<StockItem, "id">) {
        // Optimistic update
        await mutate(async (current = []) => {
            const optimisticId = `optimistic-${Math.random().toString(36).slice(2)}`;
            const optimisticItem: StockItem = { id: optimisticId, ...input };
            const next = [optimisticItem, ...current];
            try {
                const res = await put<{ msg: string; data: StockItem }>("/stock", input);
                return [res.data, ...current]; // replace optimistic with real
            } catch (e) {
                return current; // rollback
            }
        }, { revalidate: true });
    }

    async function updateStock(input: Partial<StockItem> & { id: string }) {
        await mutate(async (current = []) => {
            const prev = current;
            const next = current.map((it) => (it.id === input.id ? { ...it, ...input } : it));
            try {
                const res = await patch<{ msg: string; data: StockItem }>("/stock", input);
                return next.map((it) => (it.id === input.id ? res.data : it));
            } catch {
                return prev; // rollback
            }
        }, { revalidate: true });
    }

    async function deleteStock(id: string) {
        await mutate(async (current = []) => {
            const prev = current;
            const next = current.filter((it) => it.id !== id);
            try {
                await del<{ msg: string; data: { id: string } }>("/stock", { id });
                return next;
            } catch {
                return prev; // rollback
            }
        }, { revalidate: true });
    }

    async function deleteAll() {
        // You exposed DELETE /stock/all (no body)
        await mutate(async () => {
            try {
                await del<{ msg: string; data: {} }>("/stock/all");
                return [];
            } catch {
                // Keep current on failure
                return data ?? [];
            }
        }, { revalidate: true });
    }

    return {
        stocks: data ?? [],
        isLoading,
        isError: Boolean(error),
        addStock,
        updateStock,
        deleteStock,
        deleteAll,
        refresh: () => globalMutate(STOCK_KEY),
    };
}

export function useOwner() {
    return useSWR<Owner>("/stock/owner", () => get<Owner>("/stock/owner"));
}
