import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries() { },
    getGalleriesByTerm() { },
    getAuthorGallery() { },
    getGallery() { },
    addGallery() { },
    editGallery() { },
    deleteGallery() { },
    addComment() { },
    deleteComment() { },
};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
            total: 0,
        },
        authorGallery: null,
        gallery: null,

    },

    reducers: {
        setGalleries(state, { payload }) {
            state.page = payload;
        },
        setAuthorGallery(state, { payload }) {
            state.authorGallery = payload;
        },
        setGalleriesByTerm(state, { payload }) {
            state.authorGallery = payload;
        },
        setGallery(state, { payload }) {
            state.gallery = payload;
        },
        setGalleryWithComment(state, action) {
            state.gallery = {
                ...state.gallery,
                comments: [...state.gallery.comments, action.payload],
            }
        },
        deleteGallerySuccess(state, { payload }) {
            state.page.data = state.page.data.filter((gallery) => gallery.id !== payload);
        },
        appendGalleries(state, { payload }) {
            state.page = {
                ...payload,
                data: [...state.page.data, ...payload.data],
            };
        },
        deleteCommentSuccess(state, { payload }) {
            state.gallery = state.gallery.comments.filter((comment) => comment.id !== payload);
        },
        ...middlewareActions,
    },
});

export const {
    getGalleries,
    setGalleries,
    getAuthorGallery,
    setAuthorGallery,
    getGallery,
    setGallery,
    addGallery,
    editGallery,
    getGalleriesByTerm,
    setGalleriesByTerm,
    deleteGallery,
    deleteGallerySuccess,
    appendGalleries,
    addComment,
    setGalleryWithComment,
    deleteComment,
    deleteCommentSuccess,
} = galleriesSlice.actions;

export default galleriesSlice.reducer;