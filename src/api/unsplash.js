import axios from "axios";

const ACCESS_KEY = "4gtW7vKIyFALDUD7yWqjAqZmEt6LYUXSPKuiJgRBMHs";
const API_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page = 1) => {
  try {
    const { data } = await axios.get(API_URL, {
      params: {
        query,
        page,
        per_page: 15,
        client_id: ACCESS_KEY,
      },
    });

    return data.results;
  } catch (error) {
    console.error("Ошибка при загрузке изображений:", error);
    return [];
  }
};
