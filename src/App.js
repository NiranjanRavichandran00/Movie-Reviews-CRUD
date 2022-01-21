import { useState, useEffect } from 'react'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import DatePicker from 'react-date-picker'

function App() {

  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState([]);

  const handleRating = (rate) => {
    setRating(rate)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/movie/read')
      .then((response) => {
        setList(response.data);
      })
  }, []);

  const addReview = () => {
    console.log(date);
    axios.post('http://localhost:3001/movie/insert', {
      movieName: movieName,
      lastWatched: date,
      rating: rating})
      .then( res => console.log(res.data));
  }

  return (
    <div className="App">
      <h1>Movie Reviews </h1>
      <label>Movie Name</label>
      <input type = "text" onChange={(e) => {setMovieName(e.target.value)}}></input>
      <label>Times Watched {movieName} </label>
      <DatePicker 
        onChange={setDate}
        value={date}
      />
      <Rating 
        className= "rating" 
        onClick={handleRating} 
        ratingValue={rating}
        allowHalfIcon={true}
        transition={true}
      />
      <button onClick={addReview}>Add to reviews</button>
      {list.map((movie, key) => (
          <div className = "item" key={key}>
             <h1>{movie.movieName}</h1>
             <h1>{movie.watchDate.getDate}</h1>
             <Rating 
              ratingValue={movie.rating}
              allowHalfIcon={true}
              readonly={true}
            />
          </div>
      ))}
    </div>
  );
}

export default App;
