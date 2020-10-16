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

  const ignoreJob = (id) => {
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"interested": "false"}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(response => response.json())
  }

  const saveJob = (id, index) => {
    setLoading(!loading)
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"remind_me": !jobs[index].remind_me}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(response => response.json())
    let savedJobs = [...jobs]
    savedJobs[index] = {
      ...savedJobs[index], remind_me: !savedJobs[index].remind_me
    }

    setJobs(savedJobs)
    console.log('job marked as saved')

  }

  const appliedForJob = (id, index) => {
    setLoading(!loading)
    fetch(`http://localhost:3000/openings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({"applied": !jobs[index].applied}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(res => res.json())

    let appliedJobs = [...jobs]
    appliedJobs[index] = {
      ...appliedJobs[index], applied: !appliedJobs[index].applied
    }

    setJobs(appliedJobs)
    console.log('marked as applied')
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

  // // TODO: we are automatically filtering out senior roles, eventually will make this an option
  let filteredJobs = jobs.filter(single_job => 
    !single_job.job_title.toLowerCase().includes('senior') && !single_job.job_title.toLowerCase().includes('sr') && !single_job.job_title.toLowerCase().includes('lead')
    )


  return (
    <>
      <header className="masthead">
        <div className="site-heading">
          <h1 className="heading">
            Open Positions
          </h1>
          <span className="subheading">
            Current listings for full stack developer jobs. NO senior / sr / lead listings.
          </span> <br />
          <button className='btn-refresh' onClick={() => refreshLinked()} >Refresh Linkedin</button>
          <button className='btn-refresh' onClick={() => refreshIndeed()} >Refresh Indeed</button>
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
