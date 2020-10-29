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
  // const [ viewSaved, setViewSaved ] = useState(false)
  // const [ viewApplied, setViewApplied ] = useState(false)

  const filterTerms = {
    
  }

  const ignoreJob = (id) => {
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"interested": "false"}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(response => response.json())
  }

  const saveJob = (id, reminder) => {
    setLoading(!loading)
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"remind_me": reminder}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(response => response.json())

    let savedJobs = jobs.map(job => job.id === id ? {...job, remind_me: !job.remind_me} : job )
    setJobs(savedJobs)
  }

  const appliedForJob = (id, appliedFor) => {
    setLoading(!loading)
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"applied": appliedFor}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(res => res.json())
    let appliedJobs = jobs.map(job => job.id === id ? {...job, applied: !job.applied} : job )
    setJobs(appliedJobs)
  }

  const removeJob = (id) => {
    setLoading(!loading)
    ignoreJob(id)
    let updatedJobs = jobs.filter((single_job) => single_job.id !== id )
    setJobs(updatedJobs)
  }

  const refreshLinked = () => {
    setLoading(!loading)
    fetch('http://localhost:3000/linkedin')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
  }
  
  const refreshNyc = () => {
    setLoading(!loading)
    fetch('http://localhost:3000/nycstartup')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
  }

  const refreshIndeed = () => {
    setLoading(!loading)
    fetch('http://localhost:3000/indeed')
      .then(response => response.json())
      .then(joberinos => {
        setJobs(joberinos)
      })
      .catch(err => {
        setLoading(!loading)
        alert("you'll need to refresh the page and try again, indeed has a lot of popups that mess with the scrape method sometimes.")})
  }
  
  useEffect(() => {
    fetch('http://localhost:3000/openings')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
  }, []);

  useEffect(() => {
    setLoading(!loading)
  }, [jobs]);

  // TODO: we are automatically filtering out senior roles, eventually will make this an option
  const filteredJobs = jobs.filter(single_job => 
    !single_job.job_title.toLowerCase().includes('senior') && !single_job.job_title.toLowerCase().includes('sr') && !single_job.job_title.toLowerCase().includes('lead') &&
      !single_job.job_title.toLowerCase().includes('manager') && !single_job.job_title.toLowerCase().includes('director') && !single_job.job_title.toLowerCase().includes('vp') &&
      !single_job.job_title.toLowerCase().includes('vice president') && !single_job.job_title.toLowerCase().includes('principal') && !single_job.job_title.toLowerCase().includes('architect')
      //  || single_job.applied == viewApplied || single_job.remind_me == viewSaved
    )
  
  // TODO: disable buttons when actively searching for new jobs
  // TODO: display new icon on newly displayed listings
  // TODO: add buttons to hide / show saved or applied listings
  // TODO: display which source job listing came from

  return (
    <>
      <header className="masthead">
        <div className="site-heading">
          <h1 className="heading">
            Open Positions
          </h1>
          <span className="subheading">
            Current listings for full stack developer and software engineering jobs in the past 24hrs. <br /> NO senior / sr / lead / VP / Director / Principal listings.
          </span> <br />
          <button className='btn-refresh' onClick={() => refreshLinked()} >Refresh Linkedin</button>
          <button className='btn-refresh' onClick={() => refreshNyc()} >Refresh Built in NYC</button>
          <button className='btn-refresh' onClick={() => refreshIndeed()} >Refresh Indeed</button>
          {/* <br /> */}
          {/* <button className='btn-refresh' onClick={() => refreshLinked()} >View Saved</button>
          <button className='btn-refresh' onClick={() => refreshIndeed()} >View Applied</button> */}
          <br /> {filteredJobs.length} jobs being displayed. 
        </div>
      </header>
      
        { loading ? <BarLoader
            css={override}
            size={50}
            width={400}
            color={"#393a5f"}
        /> 
        : null }
      
      { filteredJobs ? filteredJobs.map((job, index) => 
          <JobCard 
            job={job}
            index={index}
            saveJob={saveJob}
            removeJob={removeJob}
            appliedForJob={appliedForJob}
            key={job.id}
          /> )
          :
          null
      }
    </>
  );
}

export default ViewJobs;
