import React from 'react';
import './JobCard.scss';
import { JobProps } from '../../models/job.interface';

export const JobCard: React.FC<JobProps> = ({job}) => {
  return (
    <div className="job-card">
        <div className="job-card__author">
            <h4 className="job-card__author-name">{job?.author?.name}</h4>
            <h5 className="job-card__author-date">{job?.date}</h5>
        </div>
        <h3 className="job-card__title">{job?.title}</h3>
        <div className="job-card__body">
            {job?.description}
        </div>
    </div>
  )
}
