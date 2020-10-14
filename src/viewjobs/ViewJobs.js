import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const ViewJobs = () => {
  const [ jobs, setJobs ] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:3000/openings')
      .then(response => response.json())
      .then(joberinos => setJobs(joberinos))
  }, []);

  return (
    <>
      <header className="masthead">
        <div className="site-heading">
          <h1 className="heading">
            Open Positions
          </h1>
          <span className="subheading">
            Current listings for web design and front-end development jobs.
          </span>
        </div>
      </header>

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
