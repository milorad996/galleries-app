import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../store/galleries/slice";



function AddComment({ galleryId }) {
    const [newComment, setNewComment] = useState({ body: '' });
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newComment)
        dispatch(addComment({
            galleryId,
            body: newComment,
        }))


        setNewComment({ body: '' });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    cols="50"
                    rows="4"
                    type='text'
                    value={newComment.body}
                    onChange={({ target }) => setNewComment({ text: target.value })}
                />
                <button>Add comment</button>
            </form>
        </div>
    );
}
export default AddComment;