import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";
import { selectGalleries, selectGallery } from "../store/galleries/selectors";
import { getGalleries, getGallery, setGalleries } from "../store/galleries/slice";

function SingleGallery({
    id,
    title,
    description,
    author,
    images,
    created_at,

}) {

    const gallery = useSelector(selectGallery);

    const formattedDate = useFormattedDate(
        created_at,
        "yyyy-MM-dd"
    );




    return (
        <div>



            <Card style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "solid",
                    margin: "5px",
                    width: "100%",
                    justifyContent: "start"
                }} key={gallery?.id}>
                {images?.map((image) =>
                    <Card.Img style={{ width: "50%" }} key={image?.id} variant="top" src={image?.url} />
                )
                }

                <Card.Body>
                    <Card.Title><Link to={`/galleries/${id}`}>{title}</Link></Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        <Link to={`/authors/${author?.id}`}>{author?.first_name + " " + author?.last_name}</Link>
                    </Card.Text>
                    <Card.Text>
                        Created at: {formattedDate}
                    </Card.Text>
                </Card.Body>
            </Card>






        </div>

    )
}

export default SingleGallery;