import { useQuery } from "@tanstack/react-query";
import { fetchArticleInMenu } from "../api/restaurant";

export function useGetArticlesInMenu(menuId: string) {
    return useQuery(["get-article-in-menu"], () => fetchArticleInMenu(menuId), { enabled: menuId !== undefined });
}
