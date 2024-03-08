import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { API } from "../../constants/api"
import { CommentSliceState, CommentType, CommentsType } from "./types"

type NewCommentType = {
    postId: number;
    input : {
        body: string;
    };
}

export const fetchCheckAllComments = createAsyncThunk('/comments', async () => {
    const response = await axios.get<CommentsType, AxiosResponse<CommentSliceState>>(API + '/comments', {withCredentials: true});
    return response.data
})

export const fetchAddNewComment = createAsyncThunk('/comments/new', async ({postId, input}: NewCommentType) => {
    const response = await axios.post<CommentsType, AxiosResponse<CommentType>>(API + `/comments/new/${postId}`, input, {withCredentials: true});
    return response.data
})