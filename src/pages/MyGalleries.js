import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import SingleGallery from "../components/SingleGallery";
import { selectActiveUser } from "../store/auth/selectors";
import { getActiveUser } from "../store/auth/slice";
import { selectAuthorGallery } from "../store/galleries/selectors";
import { getAuthorGallery } from "../store/galleries/slice";


function MyGalleries() {

    const author = useSelector(selectActiveUser);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveUser());
        dispatch(getAuthorGallery({
            id: author.id
        }))

    }, [author?.id])


    const author_galleries = useSelector(selectAuthorGallery);


    function handleLoadMore() {
        dispatch(
            getAuthorGallery({
                page: author_galleries?.current_page + 1,
            })
        );
    }

    return (
        <div>
            <SearchComponent authorId={author.id} />
            <h2>My Galleries</h2>
            <>

                <div>

                    {author_galleries?.data.map((gallery) => (
                        <SingleGallery
                            {...gallery}
                            key={gallery.id}


                        />
                    ))}
                </div>
            </>
            <button
                onClick={handleLoadMore}
                disabled={author_galleries?.current_page == author_galleries?.last_page}
            >
                Load more
            </button>



        </div>
    )
}

export default MyGalleries;