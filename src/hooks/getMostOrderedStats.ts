import { useQuery } from "@tanstack/react-query";
import { getMostOrderedStats } from "../api/stats";

export function useGetMostOrderedStats(restaurantId: string) {
    return useQuery(["get-most-ordered-stats"], () => getMostOrderedStats(restaurantId), { enabled: restaurantId !== undefined });
}
