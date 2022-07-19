import React from "react";
import Search from "./components/search";
import Cards from "./components/cards";
import "./index.css"

function App() {
  const [playerObj, setPlayerObj] = React.useState([])
  const [page, setPage] = React.useState(1) /// TRACKS PAGE NUMBER OF API
  const [searchVal, setSearchVal] = React.useState('') /// FOR TYPING INTO SEARCH BAR
  const [submitVal, setSubmitVal] = React.useState('') //// GETS SEARCH VAL AND SETS PAGE TO 1

  const [showLoadButton, setShowLoadButton] = React.useState(true)

  React.useEffect(() => {
    function Search() {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${submitVal}&page=${page}`)
        .then(data => data.json())
        .then(val => {
          
          console.log(val)
          if (page === 1) {
            if (page === val.meta.total_pages) {
              setShowLoadButton(false)
            } else {
              setShowLoadButton(true)
            }
            setPlayerObj(prev => val.data)
          } else {
            setPlayerObj(prev => prev.concat(val.data))
            if(page ===  val.meta.total_pages) {
              setShowLoadButton(false)
            }
          }

        })}
    Search()
  }, [submitVal, page])

  function submitSearch(event) {
    event.preventDefault()
    setSubmitVal(searchVal)
    setPage(1)
  }


  const player_cards = playerObj.map(item => {
    return <Cards 
          item = {item}
           />
  })

  return (
    <div className="container">
        <h1>NBA Player Search</h1>
        <Search 
          searchVal = {searchVal}
          setSearchVal = {setSearchVal}
          submitSearch = {submitSearch}
        />
        <div className="card-container">
          {player_cards}
        </div>
        {showLoadButton && <button onClick={() => setPage(prev => prev + 1)}>Load More</button>}
    </div>
  );
}

export default App;
