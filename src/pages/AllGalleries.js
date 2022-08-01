import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "../components/SearchComponent";
import SingleGallery from "../components/SingleGallery";
import { selectGalleries } from "../store/galleries/selectors";
import { getGalleries } from "../store/galleries/slice";


function AllGalleries() {

    const galleries = useSelector(selectGalleries);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getGalleries());
    }, []);
    function handleLoadMore() {
        dispatch(
            getGalleries({
                page: galleries.current_page + 1,
            })
        );
    }


    return (
        <div>
            <SearchComponent />
            <h2>All Galleries</h2>
            <>

                <div>

                    {galleries.data.map((gallery) => (
                        <SingleGallery
                            {...gallery}
                            key={gallery.id}


                        />
                    ))}
                </div>
            </>
            <button
                onClick={handleLoadMore}
                disabled={galleries.current_page == galleries.last_page}
            >
                Load more
            </button>



        </div>
    )
}

export default AllGalleries;