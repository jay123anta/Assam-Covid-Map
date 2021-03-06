import React, { useState, useEffect } from "react";
import Map from "./components/map";
import Counter from "./components/counter";
import DeepDive from './components/ChartAll';
import axios from "axios";
import Moment from 'moment';
import Typist from 'react-typist';


function App() {
  const [districts, setDistricts] = useState({});
  const [fetched, setFetched] = useState(false);
  const [updatedtime, setUpdatedtime] = useState();

  useEffect(() => {
    if (fetched === false) {
      axios
        .get("https://covid19assam-api.herokuapp.com/data")
        .then(response => {
          setDistricts(response.data.Assam);
          setUpdatedtime(response.data.Time);
          setFetched(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [fetched]);

  const date = Date(updatedtime);
  const formattedDate = Moment(date).format("LLLL");
// Outputs as "February 17, 2017"

  return (
    <div className="flex bg-fiord-100 min-h-screen min-w-full justify-center">
      {!fetched && <div className="spinner min-h-screen min-w-full"></div>}
      {fetched && (
        <div className="flex-1 flex-col p-5 font-inter text-black overflow-hidden antialiased">
          <div className="flex flex-col avg:flex-row">
            <div className="flex-none avg:pr-2 avg:mr-auto mb-2 avg:mb-0">
              <p className="font-extrabold  text-2xl sm:text-2xl md:text-3xl lg:text-4xl avg:text-5xl text-center avg:text-left">
                ASSAM COVID-19 TRACKER
              </p>
              <p className="text-sm text-center italic avg:text-left">
                (Data Collected From https://covid19.assam.gov.in)
              </p>
              <p className="text-sm text-center text-red-600 italic avg:text-left"> 
              <Typist>
              ( As On: {formattedDate} )
              </Typist></p>
            </div>
            <div className="flex flex-col pl-0 avg:pl-2">
              <Counter districts={districts} />
            </div>
          </div>
          <div className="flex flex-col avg:flex-row mt-2">
            <div className="flex flex-col pl-0 avg:pl-2 avg:w-2/3">
              <Map districts={districts} />
            </div>
            <div className="flex-none avg:pr-2 avg:mr-auto mb-2 avg:mb-0">
              <p className="font-bold  text-2xl text-center avg:text-left">
                Charts
              </p>
              <p className="text-sm italic text-center avg:text-left"> (Data Collected From https://api.covid19india.org/)
              </p>
            </div>
            <div className="flex flex-col order-last avg:order-first pr-0 avg:pr-2 avg:w-1/3">
            <DeepDive />
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
