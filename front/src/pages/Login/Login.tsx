import React, { SyntheticEvent, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import './Login.scss';

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { login } = useActions();
    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);

    const submitLogin = (e: SyntheticEvent) => {
        e.preventDefault();

        login(email, password);
        if(userInfo){
            setRedirect(true)
        }
    }

    useEffect(() => {
        if(userInfo != null){
            setRedirect(true);
        }
    }, [userInfo]);

    if(redirect){
        return <Navigate to="/" />
    }
    
    if(loading){
        return <h1>Cargando...</h1>
    }
    return(
        <form className="form container" onSubmit={submitLogin}>
            <h1 className="mb-5">Iniciar sesión</h1>
            <div className="mb-3">
                <label className="form-label">Correo electronico: </label>
                <input type="text" className="form-control" placeholder="correo electronico" 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Contraseña</label>
                <input type="password" className="form-control" placeholder="Contraseña" 
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-info">Iniciar Sesión</button>
            </div>

        </form>
        
    );
};

export default Login;