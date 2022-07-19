import React from "react";

export default function Search({searchVal, setSearchVal, submitSearch}) {

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                >
                </input>
                <button onClick={(event) => submitSearch(event)}>Enter</button>
            </form>
        </div>
    )
}