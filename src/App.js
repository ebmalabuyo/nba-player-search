import React from "react";
import Search from "./components/search";
import Cards from "./components/cards";
import Modal from "./components/modal";
import "./index.css"

function App() {
  const [playerObj, setPlayerObj] = React.useState([])
  const [page, setPage] = React.useState(1) /// TRACKS PAGE NUMBER OF API
  const [searchVal, setSearchVal] = React.useState('') /// FOR TYPING INTO SEARCH BAR
  const [submitVal, setSubmitVal] = React.useState('') //// GETS SEARCH VAL AND SETS PAGE TO 1
  const [showLoadButton, setShowLoadButton] = React.useState(true) /// FOR Showing load button
  const [showModal, setShowModal] = React.useState(false)


  React.useEffect(() => {
    function Search() {
      fetch(`https://www.balldontlie.io/api/v1/players?search=${submitVal}&page=${page}`)
        .then(data => data.json())
        .then(val => {
          
          console.log(val)
          if (page === 1) {
            if (page === val.meta.total_pages || val.data.length === 0) {
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

  function summonModalInfo(id_num) {
    setShowModal(true)
  }


  const player_cards = playerObj !== [] ? playerObj.map(item => {
    return <Cards 
          item = {item}
          summonModalInfo = {summonModalInfo}

           />
  }) : <div>Data Not Found</div>

  return (
    <div className="container">
        <div className="header">
          <h1>NBA Player Search</h1>
          <Search 
            searchVal = {searchVal}
            setSearchVal = {setSearchVal}
            submitSearch = {submitSearch}
          />
        </div>
        <div className="card-container">
          {player_cards}
        </div>
        {showLoadButton && <button className="load" onClick={() => setPage(prev => prev + 1)}>Load More</button>}
        {showModal && 
        <Modal
          setShowModal={setShowModal}
        />}
    </div>
  );
}

export default App;
