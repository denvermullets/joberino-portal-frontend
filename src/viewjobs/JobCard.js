import React from 'react';

const JobCard = (props) => {
  const { id, applied, company_name, company_page, connection, job_description, job_source, job_title, job_url, location, remind_me, salary_info } = props.job
  const jobApplied = applied ? ' applied ' : " "
  const jobSaved = remind_me ? 'saved' : ""
  return (
    <>

        <ul className={"job-list"}>
        {/* <ul className={"job-list" + jobApplied + jobSaved }> */}
          <li className={"job-preview" + jobApplied + jobSaved }>
            <h2 className="job-title">
             <a href={job_url} target="_blank" rel="noopener noreferrer" >{ job_title ? job_title : null }</a>
            </h2>
            <h3 className="job-title">
             { salary_info ? salary_info : null }
            </h3>
            <h3 className="company">
              {
                company_page ? 
                  <a href={ company_page ? `${company_page}people` : null } target="_blank" className="company" rel="noopener noreferrer" >
                    { location ? `${company_name} - ${location}` : company_name }</a>
                : location ? `${company_name} - ${location}` : company_name 
              }
              
            </h3>
            
            <h5 className="location">
              { connection ? connection : null }
            </h5>
            <p>{ job_description ? job_description : null }</p>
            <a href={job_url} target="_blank" rel="noopener noreferrer" >
              <button className="btn-apply">
                View
              </button>
            </a>
            <button className="btn-apply" onClick={() => props.saveJob(id, props.index)}>
              Save
            </button>
            <button className="btn-apply" onClick={() => props.appliedForJob(id, props.index)}>
              Applied
            </button>
            <button className="btn-apply" onClick={() => props.removeJob(id)}>
              Ignore
            </button>
          </li>
        </ul>

    </>
  );
}

export default JobCard;