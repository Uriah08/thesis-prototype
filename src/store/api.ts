import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Agent } from "@prisma/client";

type AgentResponse = {
    agents: Agent[];
    message: string;
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
    }),
    tagTypes: ['Agent'],
    endpoints: (builder) => ({
        createAgent: builder.mutation({
            query: (data) => ({
                url: "/agent",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Agent'],
        }),
        getAgents: builder.query<AgentResponse, void>({
            query: () => ({
                url: "/agent",
                method: "GET",
            }),
            providesTags: ['Agent'],
        }),
    })
})

export const {
    useCreateAgentMutation,
    useGetAgentsQuery,
} = api