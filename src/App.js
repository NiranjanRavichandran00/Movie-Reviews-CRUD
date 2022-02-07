import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import DatePicker from 'react-date-picker'
import Card from './components/Card'
import EditableCard from './components/EditableCard'

function App() {

  const [movieName, setMovieName] = useState('');
  const [editable, setEditable] = useState(-1);
  const [newName, setNewName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [rating, setRating] = useState(0);
  const [changeState, setChangeState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('ASC');

  const handleEdit = (id) => {
    if(editable === id)
    {
      setEditable(-1);
    }
    else
    {
      setEditable(id);
    }
  }

  const handleRating = (rate) => {
    setRating(rate)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/movie/read')
      .then((response) => {
        setList(response.data);
      })
  }, [changeState]);

  const addReview = () => {
    axios.post('http://localhost:3001/movie/insert', {
      movieName: movieName,
      lastWatched: date,
      rating: rating,
      review: movieReview})
      .then( res => {
        setChangeState(!changeState);
        console.log(res.data)});
    
  }

  const updateName = (id) => {
    axios.put('http://localhost:3001/movie/update', {
      id: id, 
      newName: newName
    })
    .then ( res => {
      setChangeState(!changeState);
    });
  }
  
  const deleteReview = (id) =>  {
      axios.delete(`http://localhost:3001/movie/delete/${id}`)
      .then ( res => {
        setChangeState(!changeState);
      });; 
  }

  const sorting = (col) => {
      if(order === "ASC")
      {
        const sorted = [...list].sort((a,b) => 
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        console.log(sorted);  
        setList(sorted);
        setOrder('DSC')
      }

      if(order === "DSC")
      {
        const sorted = [...list].sort((a,b) => 
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setList(sorted);
        setOrder('ASC')
      }
  }

  return (
    <div className="App">
      <h1>Movie Reviews </h1>
      <label>Movie Name</label>
      <input type = "text" onChange={(e) => {setMovieName(e.target.value)}}></input>
      <input type = "text" placeholder='Review' onChange={(e) => {setMovieReview(e.target.value)}}></input>
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
      <button onClick={() => sorting('movieName')}>Sort by name {order}</button>
      <input type = "text" placeholder='Search...' onChange={(e) => {setSearch(e.target.value)}}/>
      <div className='movie-grid'>
        {list.filter((movie) => {
          if (search === "")
          {
              return movie;
          } 
          else if(movie.movieName.toLowerCase().includes(search.toLowerCase()))
          {
              return movie;
          }
        }).map((movie, key) => (
          <div>
            {(editable === movie._id) ? 
               <EditableCard 
               key = {key}
               movie = {movie}
               handleEdit = {handleEdit}
               setNewName = {setNewName}
            /> :
            <Card 
            key = {key}
            movie = {movie}
            handleEdit = {handleEdit}
            />
            }
          </div>
        //    <div className = "item" key={key}>
        //       <h1>{movie.movieName}</h1>
        //       <h1>{movie.review}</h1>
        //       <Rating 
        //        ratingValue={movie.rating}
        //        allowHalfIcon={true}
        //        readonly={true}
        //      />
        //       <h1>{moment(movie.watchDate).format("MM/DD/YY")}</h1>
        //      <input type = "text" placeHolder = "Change Name"  onChange={(e) => {setNewName(e.target.value)}}/> 
        //      <button onClick={() => updateName(movie._id)}>Update</button>
        //      <button onClick={() => deleteReview(movie._id)}>Delete</button>
        //    </div>
        ))}
      </div> 
    </div>
  );
}

export default App;
