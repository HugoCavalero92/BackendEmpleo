import React, { SyntheticEvent, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './CVForm.scss';

export const CVForm: React.FC = () => {

    const [experience, setExperience ] = useState('');
    const [education, setEducation ] = useState('');
    const [language, setLanguage ] = useState('');
    const [personalInformation, setPersonalInformation ] = useState('');
    const { createCVPost } = useActions();
    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    const numberOfRows = 3;
    
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        createCVPost(experience, education, language, personalInformation, userInfo);
    }

  return (
    <div className="cv-container">
    <form className="form container" onSubmit={submit}>
        <h1 className="form-container__title mb-5">Crear Hoja De Vida</h1>
        <div className="mb-4">
            <label className="form-label">Información Personal: </label>
            <textarea className="form-control" rows={numberOfRows} onChange={e => setPersonalInformation(e.target.value)}></textarea>
        </div>
        <div className="mb-4">
            <label className="form-label">Educación: </label>
            <textarea className="form-control" rows={numberOfRows} onChange={e => setEducation(e.target.value)}></textarea>
        </div>
        <div className="mb-4">
            <label className="form-label">Experiencia: </label>
            <textarea className="form-control" rows={numberOfRows} onChange={e => setExperience(e.target.value)}></textarea>
        </div>
        <div className="mb-4">
            <label className="form-label">Idiomas: </label>
            <textarea className="form-control" rows={numberOfRows} onChange={e => setLanguage(e.target.value)}></textarea>
        </div>
        <div className="form-container__submit mt-4">
            <button className="form-container__submit-button">Publicar</button>
        </div>
    </form>
</div>
  )
}
