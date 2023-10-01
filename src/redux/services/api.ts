import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PostProps } from "../../model/types";
import { BASE_URL } from "../../constants";
import { getToken } from "../../constants";
//64cb6c5590cde15731b5ca79

export const api = createApi({
    reducerPath: "posts",
    baseQuery: fetchBaseQuery({baseUrl:BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
     
    },
  }),
    tagTypes: ["Posts","Comment"],
    endpoints: (builder) => ({
        registerUser : builder.mutation({
            query: payload =>({
                url: '/signup',
                method: 'POST',
                body:payload,
                
            })
        }),
        loginUser : builder.mutation({
            query : payload =>({
                url:"/login",
                method:"POST",
                body:payload
            })
        }),
      getPosts: builder.query({
        query: (pageNumber) => `post?page=${pageNumber}`,
         transformResponse: (response: { data: any }) => response.data,
        providesTags: ["Posts"],
      }),
      getPostsByUser:builder.query({
        query:(id) =>`user-posts/?userId=${id}`,
        providesTags: ["Posts"],
      }),
      getSinglePost :builder.query({
         query:(id) => `post/${id}`,
         providesTags: ["Posts"],
          keepUnusedDataFor: 5 * 60 * 1000
      }),
      addPost :builder.mutation<PostProps, any>({
        query: payload =>({
            url: '/post',
            method:'POST',
            body: payload
        }),
        invalidatesTags: ["Posts"],
      }),
      updatePost : builder.mutation<void, PostProps>({
        query: ({id,...rest}) =>({
            url: `/post/${id}`,
            method:'PUT',
            body: rest

        }),
        invalidatesTags: ["Posts"],
      }),
      deletePost : builder.mutation<void, string |null>({
        query: (id) =>({
            url: `/post/${id}`,
            method:'DELETE',
           
        }),
        invalidatesTags: ["Posts"],
      }),
      addComment :builder.mutation({
        query: payload =>({
            url:'/comment',
            method: 'POST',
            body:payload
        }),
        invalidatesTags:['Comment']
    }),
    getAllPostsComments : builder.query({
        query:(id) =>({
          url: `/post-comments/?postId=${id}`,
          
        }),
        providesTags:["Comment"]

    }),
    deleteComment: builder.mutation({
        query:(id) =>({
          url:`/comment/${id}`,
          method:'DELETE'
        }),
      //    onMutate: (userData) => {
      
      //   const optimisticResponse = { ...userData, status: 'updating' };
      //   return optimisticResponse;
      // },
    
      // onError: (error, variables, context) => {
      //   // Revert the optimistic update in case of an error
      //   return context.rollback();
      // },
        invalidatesTags:["Comment"]

    })
    }),
  });
  export const {useLoginUserMutation,  useGetPostsByUserQuery,useRegisterUserMutation, useGetPostsQuery, useGetSinglePostQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation,useAddCommentMutation, useGetAllPostsCommentsQuery, useDeleteCommentMutation} = api