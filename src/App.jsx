import React, { useEffect, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Stats,
  SortBy,
  Pagination,
  connectHits
} from "react-instantsearch-dom";
import './App.css'
import { searchClient } from './Algolia';

const Hit = ({ hit, handleOnclick }) => {
  const profile = hit.reg.split(" ")[1]

  const handleclick = () => {
    handleOnclick(profile);
  }

  return (
    <div className=" h-32 flex w-[11rem]  xl:w-[16rem] bg-white m-1 xl:m-3 items-center p-2 rounded-lg shadow-lg border " onClick={handleclick}>

      <img src={`http://146.190.42.50/jmc/Photo/${profile}.jpg`} alt={''} className=" h-16 w-16 xl:h-24 xl:w-24 rounded object-fill" />

      <div className="p-2">
        <h1 className=" text-sm xl:text-base font-semibold h-12 text-ellipsis overflow-hidden ">{hit.name}</h1>
        <h1 className=" text-slate-400 text-sm">{hit.reg}</h1>
        <h1 className=" text-slate-400 text-sm">{hit.dob}</h1>
        <h1 className=" text-slate-400 text-sm">{hit.filterdep}</h1>
      </div>

    </div>
  )
}

const CustomHits = ({ hits, selectedFilter, handleOnclick }) => {
  const filteredHits =
    selectedFilter === ""
      ? hits
      : hits.filter((hit) => hit.filterdep === selectedFilter);

  return (
    <div className=" w-full flex justify-center items-center flex-wrap ">
      {filteredHits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} handleOnclick={handleOnclick} />
      ))}
    </div>
  );
};


function App() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isKey, setIsKey] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [registerNo, setRegisterNo] = useState('');

  useEffect(() => {
    const getToken = localStorage.getItem('key')
    if (getToken === 'sa') {
      setIsKey(true);
    }
  }, [])

  const ConnectedHits = connectHits(CustomHits);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handlePermissionClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (clickCount >= 5) {
      localStorage.setItem('key', 'sa');
      setIsKey(true);
    }
  }, [clickCount]);

  return (
    <div className=" w-screen h-screen overflow-x-hidden relative items-center justify-center">
      {isKey ? <InstantSearch searchClient={searchClient} indexName="jmc">

        <div>
          <div className=" h-[5rem] w-full relative">
            <img src="https://dashboard.algolia.com/client-assets/2534bd4e95b5dbe7bee3f002463da377/325b80f284f2d0f174a7.png" alt="" className="h-[5rem] w-full object-cover" />
            <div className=" absolute top-1 w-full flex justify-center items-center h-full">
              <SearchBox />
            </div>
          </div>
          <div className=" w-full h-full">
            <div className=" w-full xl:px-20 flex flex-col justify-center items-center">
              <div className=" flex justify-center items-center space-x-2 my-2">
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="ml-2 p-2 rounded-lg border bg-white"
                >
                  <option value="">All</option>
                  <option value="CS">CS</option>
                  <option value="CO">CO</option>
                  <option value="CA">CA</option>
                  <option value="PH">PH</option>
                  <option value="CH">CH</option>
                  <option value="CH">BA</option>
                  <option value="CH">FT</option>
                </select>
                <div className="stats">
                  {" "}
                  <Stats />{" "}
                </div>
              </div>
              <ConnectedHits selectedFilter={selectedFilter} handleOnclick={setRegisterNo} />
              <div>
                {" "}
                <Pagination />
              </div>
            </div>
          </div>
          {
            registerNo && <div className=" w-full h-full flex justify-center items-center absolute top-0">
              <div className=" w-[40rem] h-[42rem] bg-white border shadow-md rounded-md flex flex-col justify-between pb-24 items-center">
                <div className=" w-full h-10 bg-slate-300 flex justify-end px-3 items-center">
                    <button onClick={()=>setRegisterNo('')} className=" w-6 h-6 rounded-full text-white bg-black">X</button>
                </div>
                <img src={`http://146.190.42.50/jmc/Photo/${registerNo}.jpg`} alt="" loading="lazy"   className=" w-[30rem] h-[30rem] rounded-md"/>

              </div>
            </div>
          }
        </div>

      </InstantSearch> : <div className=" w-full h-full flex justify-center items-center">
        <h1 className=" text-9xl text-black" onClick={handlePermissionClick}>You dont have permission vro!</h1>
      </div>

      }
    </div>
  );
}

export default App;

