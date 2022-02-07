import React from 'react';
import popcorn from '../popcorn.png'
import { Rating } from 'react-simple-star-rating'
import {FaEdit} from 'react-icons/fa'
import './Card.css'

const Card = ({movie, handleEdit}) => {

  return (
    <div className='card-container'> 
        <div className="img-container">
            <img src = {popcorn} alt = "poster" />
        </div>
        <div className="card-title">
            <h3>{movie.movieName}</h3>
            <FaEdit 
                size ={20} 
                style = {{marginTop: '19px', marginRight: '20px'}}
                onClick = {() => handleEdit(movie._id)}
            />
        </div>
        <div className="card-body">
            <p>{movie.review}</p>
        </div>
        <div className="rating">
            <Rating 
                ratingValue={movie.rating}
                allowHalfIcon={true}
                readonly={true}
            />
        </div>
    </div>

  )
};

export default Card;
