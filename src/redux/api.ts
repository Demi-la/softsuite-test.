import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Model } from "../component/Model";

export const apiRequest = createApi({
  reducerPath: "apiRequest",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://650af6bedfd73d1fab094cf7.mockapi.io/",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getElements: builder.query<any, void>({
      query: () => `elements`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.content.map(({ id }: { id: string }) => ({
                type: "Posts" as const,
                id,
              })),
              { type: "Posts", id: "Elements" },
            ]
          : [{ type: "Posts", id: "Elements" }],
    }),
    getLookUps: builder.query<any, void>({
      query: () => "lookups",
    }),
    getLookUpValueById: builder.query<
      any,
      { lookupId: string; lookupValueId: string }
    >({
      query: ({ lookupId, lookupValueId }) =>
        `lookups/${lookupId}/lookupvalues/${lookupValueId}`,
    }),
    addElement: builder.mutation<void, any>({
      query: (newElement) => ({
        url: `elements`,
        method: "POST",
        body: newElement,
      }),
      invalidatesTags: [{ type: "Posts", id: "Elements" }],
    }),
    getLookUpValues: builder.query<any, string>({
      query: (lookupId) => `lookups/${lookupId}/lookupvalues`,
    }),
    deleteElement: builder.mutation<void, string>({
      query: (id) => ({
        url: `elements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "Elements" }],
    }),
  }),
});

export const {
  useGetElementsQuery,
  useGetLookUpsQuery,
  useGetLookUpValueByIdQuery,
  useAddElementMutation,
  useGetLookUpValuesQuery,
  useDeleteElementMutation,
} = apiRequest;
