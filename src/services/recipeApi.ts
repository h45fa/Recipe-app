import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const YOUR_APP_KEY = "a94c89d2d0f51ebf975c486e391f8b3e";
const YOUR_APP_ID = "5519ab41";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
  endpoints: (builded) => ({
    getRecipes: builded.mutation({
      query: ({ query, health }) => {
        return {
          url: `search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${health}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetRecipesMutation } = recipeApi;
