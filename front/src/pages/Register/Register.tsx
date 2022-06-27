import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Register.scss';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Register: React.FC = () => {

    const [name, setName ] = useState('');
    const [surname, setSurname ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [recruiter, setRecruiter ] = useState(false);
    const [redirect, setRedirect ] = useState(false);
    const { register } = useActions();
    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(recruiter);
        register(name, surname, email, password, recruiter);

    }
    useEffect(() => {
        if(userInfo != null){
            setRedirect(true);
        }
    }, [userInfo]);
    
    if(redirect){
        return <Navigate to="/"/>
    }
    return(
        <div className="register-container">
        <form className="form container" onSubmit={submit}>
            <h1 className="form-container__title mb-5">Creá tu cuenta</h1>
            <div className="mb-3">
                <label className="form-label">Nombre: </label>
                <input type="text" className="form-control" placeholder="Nombre" 
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="form-label">Apellido: </label>
                <input type="text" className="form-control" placeholder="Apellido" 
                    onChange={e => setSurname(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="form-label">Correo electronico: </label>
                <input type="text" className="form-control" placeholder="correo electronico" 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label  className="form-label">Contraseña</label>
                <input type="password" className="form-control" placeholder="Contraseña" 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={e => setRecruiter(e.target.checked)}/>
                <label className="form-check-label">
                    Soy Reclutador
                </label>
            </div>
            <div className="form-container__submit mt-4">
                <button className="form-container__submit-button">Registrarse</button>
            </div>
        </form>
        <div className="image-container">
            <img src="https://www.bumeran.com.ar/candidate/static/media/sign-in.2d89cef2.svg" alt="registro" />
        </div>
        </div>
    );
};

export default Register;