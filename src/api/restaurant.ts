import axios from "axios";
import { getJWT, Tag } from "./common";

const baseUrl = `http://${process.env.REACT_APP_REVERSE_PROXY}/restaurant`;

export type Article = {
  uid: string;
  name: string;
  isUnavailable: boolean;
  photo: string;
  description: string;
  price: number;
  category: string;
  tags: Tag[];
};

export type SendArticle = {
  name: string;
  photo: string;
  description: string;
  price: number;
  tags: Tag[];
};

export type Menu = {
  uid: string;
  isUnavailable: boolean;
  name: string;
  photo: string;
  description: string;
  price: number;
  articles: {
    articleId: string;
  }[];
};

export type SendMenu = {
  isUnavailable?: boolean;
  name: string;
  photo: string;
  description: string;
  price: number;
  articles: {
    articleId: string;
  }[];
};

export type Restaurant = {
  uid: string;
  restaurantName: string;
  address: {
    longitude: string;
    latitude: string;
    fullAddress: string;
  };
  tags?: string[];
  logo: string;
  menus?: Menu[];
  articles?: Article[];
  schedule: {
    day: string;
    timeSpan: {
      openTime: string;
      closureTime: string;
    }[]
  }[]
};

export type SendRestaurant = {
  ownerId: string;
  restaurantName: string;
  address: string;
  tags?: string[];
  logo: string;
  menus?: SendMenu[];
  articles?: SendArticle[];
  schedule: {
    day: string;
    timeSpan: [
      {
        openTime: string;
        closureTime: string;
      }
    ];
  }[]
};

type GetRestaurantsByOwnerResponse = {
  state: string;
  message: string;
  restaurant: Restaurant;
};

type GetRestaurantByIdResponse = {
  state: string;
  message: string;
  restaurant: Restaurant;
};

type GetArticleByIdResponse = {
  state: string;
  message: string;
  article: Article;
};

type GetArticleByMenuIdResponse = {
  state: string;
  message: string;
  articles: Article[];
};

type GetMenuByIdResponse = {
  state: string;
  message: string;
  menu: Menu;
};

export const fetchRestaurantByOwner = async (ownerId: string): Promise<Restaurant> => {
  return await axios
    .request<GetRestaurantsByOwnerResponse>({
      method: "GET",
      url: `${baseUrl}/restaurants/owner/${ownerId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.restaurant);
};

export const createRestaurant = async (restaurant: SendRestaurant) => {
  return await axios
    .request({
      method: "POST",
      url: `${baseUrl}/restaurants`,
      headers: {
        Authorization: getJWT(),
      },
      data:
        restaurant
    })
    .then((result) => result.data.restaurant);
};

export const updateRestaurant = async (restaurant: SendRestaurant, restaurantId: string) => {
  return await axios
    .request({
      method: "PUT",
      url: `${baseUrl}/restaurants/${restaurantId}`,
      headers: {
        Authorization: getJWT(),
      },
      data:
        restaurant
    })
    .then((result) => result.data.restaurant);
};

export const fetchRestaurantById = async (
  restaurantId: string
): Promise<Restaurant> => {
  return await axios
    .request<GetRestaurantByIdResponse>({
      method: "GET",
      url: `${baseUrl}/restaurants/${restaurantId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.restaurant);
};

export const fetchArticleById = async (
  articleId: string
): Promise<Article> => {
  return await axios
    .request<GetArticleByIdResponse>({
      method: "GET",
      url: `${baseUrl}/restaurants/article/${articleId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.article);
};

export const fetchArticleInMenu = async (
  menuId: string
): Promise<Article[]> => {
  return await axios
    .request<GetArticleByMenuIdResponse>({
      method: "GET",
      url: `${baseUrl}/restaurants/menu/${menuId}/article`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.articles);
};

export const fetchMenuById = async (
  menuId: string
): Promise<Menu> => {
  return await axios
    .request<GetMenuByIdResponse>({
      method: "GET",
      url: `${baseUrl}/restaurants/menu/${menuId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.menu);
};
