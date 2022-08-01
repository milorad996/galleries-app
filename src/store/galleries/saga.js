import { takeLatest, call, put } from "redux-saga/effects";
import commentService from "../../services/CommentService";
import galleryService from "../../services/GalleryService";
import {
    getGalleries,
    setGalleries,
    getAuthorGallery,
    setAuthorGallery,
    getGallery,
    setGallery,
    addGallery,
    editGallery,
    getGalleriesByTerm,
    deleteGallery,
    deleteGallerySuccess,
    appendGalleries,
    addComment,
    setGalleryWithComment,
    deleteComment,
    deleteCommentSuccess,
} from "./slice";



function* getGalleriesHandler({ payload }) {
    try {
        const galleries = yield call(galleryService.getAll, payload?.page);


        if (payload?.page > 1) {
            yield put(appendGalleries(galleries));
        } else {
            yield put(setGalleries(galleries));
        }

    } catch (e) {
        console.log(e);
    }
}
function* getGalleriesByTermHandler({ payload }) {
    try {
        const galleries = yield call(galleryService.getByTerm, { term: payload.term, author: payload.author });
        yield put(setAuthorGallery(galleries.galleries));
        yield put(setGalleries(galleries.galleries));
    } catch (e) {
        console.log(e);
    }
}
function* getGalleryHandler({ payload }) {
    try {
        const gallery = yield call(galleryService.get, payload.id);
        yield put(setGallery(gallery));
    } catch (e) {
        console.log(e);
    }
}
function* getAuthorGalleryHandler({ payload }) {

    try {
        const author_galleries = yield call(galleryService.getAuthorGallery, payload.id);
        yield put(setAuthorGallery(author_galleries));
    } catch (e) {
        console.log(e);
    }
}
function* addGalleryHandler({ payload }) {
    try {
        yield call(galleryService.add, payload.gallery);
        if (typeof payload.meta?.onSuccess === "function") {
            yield call(payload.meta.onSuccess);
        }
    } catch (error) {
        console.log(error);
    }
}

function* updateGalleryHandler({ payload }) {
    try {
        yield call(galleryService.edit, payload.id, payload.gallery);
        if (typeof payload.meta?.onSuccess === "function") {
            yield call(payload.meta.onSuccess);
        }
    } catch (error) {
        console.log(error);
    }
}
function* deleteGalleryHandler({ payload }) {
    try {
        yield call(galleryService.delete, payload.galleryId);
        yield put(deleteGallerySuccess(payload.galleryId));
        if (typeof payload.meta?.onSuccess === "function") {
            yield call(payload.meta.onSuccess);
        }
    } catch (e) {
        console.log(e);
    }
}
function* addCommentHandler({ payload }) {
    try {
        const comment = yield call(commentService.add, payload.galleryId, { body: payload.body.text });
        yield put(setGalleryWithComment(comment))
    } catch (error) {
        console.log(error);
    }
}
function* deleteCommentHandler({ payload }) {
    try {
        yield call(commentService.delete, payload);

        yield put(deleteCommentSuccess(payload))

    } catch (e) {
        console.log(e);
    }
}



export function* watchGetGalleries() {
    yield takeLatest(getGalleries.type, getGalleriesHandler);
}
export function* watchGetGalleriesByTerm() {
    yield takeLatest(getGalleriesByTerm.type, getGalleriesByTermHandler);
}
export function* watchGetAuthorGallery() {
    yield takeLatest(getAuthorGallery.type, getAuthorGalleryHandler);
}
export function* watchGetGalleryHandler() {
    yield takeLatest(getGallery.type, getGalleryHandler);
}
export function* watchAddGalleryHandler() {
    yield takeLatest(addGallery.type, addGalleryHandler);
}
export function* watchUpdateGalleryHandler() {
    yield takeLatest(editGallery.type, updateGalleryHandler);
}
export function* watchDeleteGalleryHandler() {
    yield takeLatest(deleteGallery.type, deleteGalleryHandler);
}
export function* watchAddCommentHandler() {
    yield takeLatest(addComment.type, addCommentHandler);

}
export function* watchDeleteCommentHandler() {
    yield takeLatest(deleteComment.type, deleteCommentHandler)
}