import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import JobCard from './JobCard';

const ViewJobs = () => {

  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
  margin: 1rem auto;
  margin-bottom: 1.5rem;
  `;

  const [ jobs, setJobs ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const refreshLinked = () => {
    setLoading(!loading)
    fetch('http://localhost:3000/linkedin')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
      // .then(setLoading(!loading))
  }

  const refreshIndeed = () => {
    setLoading(!loading)
    fetch('http://localhost:3000/indeed')
      .then(response => response.json())
      .then(joberinos => {
        // setLoading(!loading)
        setJobs(joberinos)
      })
      .catch(err => alert("you'll need to refresh the page and try again, indeed has agressive anti scrape methods"))
  }
  
  useEffect(() => {
    fetch('http://localhost:3000/openings')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
  }, []);

  useEffect(() => {
    setLoading(!loading)
  }, [jobs]);

  return (
    <>
      <header className="masthead">
        <div className="site-heading">
          <h1 className="heading">
            Open Positions
          </h1>
          <span className="subheading">
            Current listings for full stack developer jobs.
          </span> <br />
          <button className='btn-refresh' onClick={() => refreshLinked()} >Refresh Linkedin</button>
          <button className='btn-refresh' onClick={() => refreshIndeed()} >Refresh Indeed</button>
        </div>
      </header>
      
        { loading ? <BarLoader
            css={override}
            size={50}
            color={"#393a5f"}
        /> 
        : null }
      

      { jobs ? jobs.map(job => 
          <JobCard 
            job={job}
            key={job.id}
          /> )
          :
          null
      }
    </>
  );
}

export default ViewJobs;
