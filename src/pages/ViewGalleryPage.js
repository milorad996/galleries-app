import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import SingleGallery from "../components/SingleGallery";
import { selectActiveUser } from "../store/auth/selectors";
import { getActiveUser } from "../store/auth/slice";
import { selectGallery } from "../store/galleries/selectors";
import { deleteComment, deleteGallery, getGallery } from "../store/galleries/slice";



function ViewGalleryPage() {

    const history = useHistory();

    const { id } = useParams();
    const dispatch = useDispatch();

    const author = useSelector(selectActiveUser)
    console.log(id);

    useEffect(() => {
        dispatch(getActiveUser());
        dispatch(getGallery({
            id: id
        }));
    }, [id, author?.id])

    const galleries = useSelector(selectGallery);


    const handleEdit = () => {
        history.push(`edit/${id}`);
    };

    function handleActionSuccessDelete() {
        history.push("/my-galleries");
    }

    const handleDelete = async () => {
        const response = prompt(
            "Are you sure you want to delete this gallery ?\n Enter 'Yes' if you are"
        );

        if (response !== "Yes") {
            return;
        }

        dispatch(deleteGallery({
            galleryId: galleries.id,
            meta: {
                onSuccess: handleActionSuccessDelete,
            },
        }));
    };


    const handleDeleteComment = async (id) => {


        dispatch(deleteComment(id));
    };

    return (
        <div>
            <h1>View gallery page</h1>
            <>

                <div>
                    <Card style={{ width: '18rem' }}>
                        {galleries?.images?.map((image) =>
                            <Card.Img key={image?.id} variant="top" src={image?.url} />
                        )
                        }

                        <Card.Body>
                            <Card.Title>{galleries?.title}</Card.Title>
                            <Card.Text>
                                {galleries?.description}
                            </Card.Text>
                            <Card.Text>
                                {galleries?.author?.first_name + " " + galleries?.author?.last_name}
                            </Card.Text>
                            {author?.id && author?.id === galleries?.author?.id ? (<>
                                <Button onClick={() => handleEdit()} variant="primary">Edit</Button>
                                <Button onClick={() => handleDelete()} variant="danger">Delete</Button></>) : <></>}
                        </Card.Body>
                    </Card>
                    {author?.id ? (<>
                        <AddComment
                            galleryId={galleries?.id}
                        />
                    </>) : <></>}
                    {galleries?.comments && galleries.comments?.length ? (
                        <div>
                            <h3>Comments:</h3>

                            {galleries?.comments?.map((comment) => (


                                <p>{comment?.body} {author?.id ? (<><button key={comment?.id} onClick={() => handleDeleteComment(comment?.id)}>Delete</button></>) : <></>}</p>

                            ))}
                        </div>
                    ) : (
                        <p>No comments</p>
                    )}

                </div>
            </>

        </div>
    )
}

export default ViewGalleryPage;