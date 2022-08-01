import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import SingleGallery from "../components/SingleGallery";
import { selectAuthorGallery, selectGallery } from "../store/galleries/selectors";
import { getAuthorGallery, getGallery } from "../store/galleries/slice";



function AuthorGalleryPage() {

    const history = useHistory();

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthorGallery({
            id: id
        }));
    }, [id])

    const galleries = useSelector(selectAuthorGallery);

    function handleLoadMore() {
        dispatch(
            getAuthorGallery({
                page: galleries.current_page + 1,
            })
        );
    }

    return (
        <div>
            <SearchComponent authorId={id} />
            <h2>Author Galleries</h2>
            <>

                <div>

                    {galleries?.data?.map((gallery) => (
                        <SingleGallery
                            {...gallery}
                            key={gallery?.id}


                        />
                    ))}
                </div>
            </>

            <button
                onClick={handleLoadMore}
                disabled={galleries?.current_page == galleries?.last_page}
            >
                Load more
            </button>


        </div>
    )
}

export default AuthorGalleryPage;