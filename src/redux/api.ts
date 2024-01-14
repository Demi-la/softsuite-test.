import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRequest = createApi({
  reducerPath: "apiRequest",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://650af6bedfd73d1fab094cf7.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getElements: builder.query<any, void>({
      query: () => `elements`,
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
  }),
});

export const {
  useGetElementsQuery,
  useGetLookUpsQuery,
  useGetLookUpValueByIdQuery,
} = apiRequest;
