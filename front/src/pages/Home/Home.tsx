import React, {useEffect} from 'react';
import './Home.scss';
import { JobCard } from '../../components/JobCard/JobCard';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { JobI } from '../../models/job.interface';

const Home: React.FC = () => {
    const {job, error, loading} = useTypedSelector((state) => state.jobs);
    const {getAllJobPost} = useActions();


    useEffect(() => {
        if(!job){
            getAllJobPost();
        };   
    },[job]);

    const renderedJobs = job?.map((job: JobI) => 
        <JobCard key={job._id} job={job}/>);
    

    return(

            <div className="home-container">
                <h1 className="home-container__title">Pagina principal</h1>

                {
                    job && !error && !loading &&
                    <>
                        {renderedJobs}
                    </>
                }
            </div>

    );
};

export default Home;