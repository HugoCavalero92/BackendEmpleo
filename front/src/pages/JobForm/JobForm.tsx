import React, { SyntheticEvent, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './JobForm.scss';
import { useActions } from '../../hooks/useActions';

const JobForm: React.FC = () => {

    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const { createJobPost } = useActions();
    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    const numberOfRows = 3;

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        createJobPost(title, description, userInfo);

    }

    return(

            <div className="job-container">
                <form className="form container" onSubmit={submit}>
                    <h1 className="form-container__title mb-5">Publicá un aviso</h1>
                    <div className="mb-3">
                        <label className="form-label">Titulo: </label>
                        <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Descripcion: </label>
                        <textarea className="form-control" rows={numberOfRows} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-container__submit mt-4">
                        <button className="form-container__submit-button">Publicar</button>
                    </div>
                </form>
            </div>

    );
};

export default JobForm;