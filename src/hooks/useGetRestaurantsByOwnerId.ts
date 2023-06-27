import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantByOwner } from "../api/restaurant";

export function useGetRestaurantsByOwnerId(ownerId: string) {
    return useQuery(["get-restaurant-by-owner"], () => fetchRestaurantByOwner(ownerId), { enabled: ownerId !== undefined });
}
