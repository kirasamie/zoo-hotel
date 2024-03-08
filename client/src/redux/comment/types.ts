
export type CommentType = {
    postId: number;
    body: string;
}

export type CommentsType = CommentType[]

export type CommentSliceState = {
    comments: CommentsType
}

export const initialState: CommentSliceState = {
    comments: [],
}