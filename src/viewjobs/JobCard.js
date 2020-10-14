import React from 'react';

const JobCard = (props) => {
  const { applied, company_name, company_page, connection, interested, job_description, job_source, job_title, job_url, location, remind_me, salary_info } = props.job

  return (
    <>

        <ul className="job-list">
          <li className="job-preview">
            <h2 className="job-title">
             <a href="">{ job_title ? job_title : null }</a>
            </h2>
            <h3 className="job-title">
             { salary_info ? salary_info : null }
            </h3>
            <h3 className="company">
              {/* { company_name ? `${company_name} - ${location}` : null } */}
              { location ? `${company_name} - ${location}` : company_name }
            </h3>
            
            <h5 className="location">
              { connection ? connection : null }
            </h5>
            <p>{ job_description ? job_description : null }</p>
            <button className="btn-apply">
              View
            </button>
            <button className="btn-apply">
              Save
            </button>
            <button className="btn-apply">
              Applied
            </button>
            <button className="btn-apply">
              Ignore
            </button>
          </li>
        </ul>

    </>
  );
}

export default JobCard;