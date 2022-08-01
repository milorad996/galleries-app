import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveUser } from "../store/auth/selectors";
import { getActiveUser } from "../store/auth/slice";
import { getGalleriesByTerm } from "../store/galleries/slice";
import { Button } from "react-bootstrap";
function SearchComponent({ authorId }) {
    const dispatch = useDispatch();
    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(getGalleriesByTerm(term));
    };

    const author = useSelector(selectActiveUser);
    const [term, setTerm] = useState({
        author: authorId,
        term: "",
    });

    useEffect(() => {
        dispatch(getActiveUser());

    }, [])

    return (
        <div>
            <input type="text" placeholder="Search..." value={term.term} onChange={({ target }) =>
                setTerm({ ...term, term: target.value })
            } />
            <Button variant="info" type="button" onClick={(e) => handleSearch(e)} >Search</Button>
        </div>

    )
}

export default SearchComponent;