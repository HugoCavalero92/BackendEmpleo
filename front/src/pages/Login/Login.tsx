import React, { SyntheticEvent, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
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
        <div className="login-container">
            <form className="form container" onSubmit={submitLogin}>
                <h1 className="form-container__title mb-5">Ingresá a tu cuenta</h1>
                <div className="mb-5">
                    <label className="form-label">Correo electronico: </label>
                    <input type="text" className="form-control" placeholder="correo electronico" 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label  className="form-label">Contraseña: </label>
                    <input type="password" className="form-control" placeholder="Contraseña" 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-container__submit">
                    <button className="form-container__submit-button">Iniciar Sesión</button>
                </div>

            </form>
            <div className="image-container">
            <img src="https://www.bumeran.com.ar/candidate/static/media/login.e6658ac3.svg" alt="login" />
        </div>
        </div>
    );
};

export default Login;