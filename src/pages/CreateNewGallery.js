import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectActiveUser } from "../store/auth/selectors";
import { selectAuthorGallery, selectGallery } from "../store/galleries/selectors";
import { addGallery, editGallery } from "../store/galleries/slice";


function CreateNewGallery() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);

    const actieUser = useSelector(selectActiveUser)
    const [newGallery, setNewGallery] = useState({
        title: "",
        description: "",
        images: [{
            url: "",
        }]
    })
    function handleActionSuccessEdit() {
        history.push(`/galleries/${gallery.id}`);
    }
    function handleActionSuccessAdd() {
        history.push("/my-galleries");
    }
    const handleCancel = (e) => {
        e.preventDefault();
        if (id) {
            history.push(`/galleries/${gallery.id}`);
        } else {
            history.push("/my-galleries");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            if (!gallery) {
                alert("You can edit only your own gallery");
                history.push("/galleries");
                return;
            }
            dispatch(
                editGallery({
                    id,
                    gallery: newGallery,
                    meta: {
                        onSuccess: handleActionSuccessEdit,
                    },
                })
            );


        } else {
            dispatch(addGallery({
                gallery: newGallery,
                meta: {
                    onSuccess: handleActionSuccessAdd,
                },
            }));


        }
    };


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...newGallery.images];
        list[index].url = value;
        setNewGallery({
            ...newGallery,
            images: list,
        });
    };

    const handleAddClick = () => {
        setNewGallery({
            ...newGallery,
            images: [...newGallery.images, { url: "" }],
        });
    };

    const handleRemoveClick = (index) => {
        setNewGallery({
            ...newGallery,
            images: newGallery.images.filter((img, i) => index != i),
        });

    };

    const reorderArray = (event, originalArray) => {
        const movedItem = originalArray.find(
            (i, index) => index === event.oldIndex
        );
        const remainingItems = originalArray.filter(
            (i, index) => index !== event.oldIndex
        );

        const reorderedItems = [
            ...remainingItems.slice(0, event.newIndex),
            movedItem,
            ...remainingItems.slice(event.newIndex),
        ];

        return reorderedItems;
    };

    function changeOrder(index, direction) {
        var updatedImages = [...newGallery.images];
        setNewGallery({
            ...newGallery,
            images: reorderArray(
                { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
                updatedImages
            ),
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 style={{ padding: "10px" }}>
                    {id ? "Edit Gallery" : "Create Gallery"}
                </h2>
                <div style={{ padding: "10px" }}>
                    <input
                        required
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={newGallery?.title}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, title: target.value })
                        }
                    />
                </div>
                <div style={{ padding: "10px" }}>
                    <textarea
                        cols="50"
                        rows="4"
                        type="text"
                        id="description"
                        placeholder="Description"
                        value={newGallery?.description}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, description: target.value })
                        }
                    />
                </div>
                {newGallery.images &&
                    newGallery.images.map((x, i) => {
                        return (
                            <div>
                                <input
                                    required
                                    key={i}
                                    name="url"
                                    value={x.url}
                                    placeholder="Image url"
                                    pattern="https?://.+(png|jpg|jpeg)"
                                    onChange={(e) => handleInputChange(e, i)}
                                />
                                <span>
                                    {newGallery.images.length > 1 && (
                                        <button onClick={() => handleRemoveClick(i)}>Remove</button>
                                    )}
                                </span>
                                <span>
                                    {newGallery.images.length > 1 && (
                                        <button type="button" onClick={() => changeOrder(i, "UP")}>
                                            Move Up
                                        </button>
                                    )}
                                </span>
                                <span>
                                    {newGallery.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => changeOrder(i, "DOWN")}
                                        >
                                            Move Down
                                        </button>
                                    )}
                                </span>
                                <div>
                                    {newGallery.images.length - 1 === i && (
                                        <button onClick={handleAddClick}>Add picture</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                <span>
                    <button type="submit">{id ? "Edit" : "Create"}</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </span>
            </form>
        </div>

    )
}

export default CreateNewGallery;