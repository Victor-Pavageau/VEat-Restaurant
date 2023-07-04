import axios from "axios";
import { getJWT } from "./common";

const baseUrl = `http://${process.env.REACT_APP_REVERSE_PROXY}/stat`;

export type restaurantStats = {
    state: string,
    message: string,
    statistics: {
        totalOrders: Number,
        activeOrders: Number
    }
}

export type salesStats = {
    state: string,
    message: string,
    statistics: {
        totalSales: Number,
        salesPerDay: {
            "2023-06-30": Number
        }
        salesPerMonth: {
            "2023-6": Number
        }
    }
}

export type mostOrderedSalesResponse = {
    state: string,
    message: string,
    statistics: mostOrderedSales
}

export type mostOrderedSales = {
    mostOrderedItems: {
        itemId: string,
        count: Number,
        type: "menu" | "article"
    }[]
}

export const getMostOrderedStats = async (
    restaurantId: string
): Promise<mostOrderedSales> => {
    return await axios
        .request<mostOrderedSalesResponse>({
            method: "GET",
            url: `${baseUrl}/most-ordered-items/${restaurantId}`,
            headers: {
                Authorization: getJWT(),
            },
        })
        .then((result) => result.data.statistics);
};