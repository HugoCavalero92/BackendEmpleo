import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './Navigation.scss';

const Navigation: React.FC = () => {

    const { userInfo, error, loading } = useTypedSelector((state) => state.userLogin);
    const { logout } = useActions();
    
    const logoutHandler = () => {
        logout();
    }

    return(
        <header className="header">
            <div className="header-container">
                <div className="header-container__logo">
                    <NavLink to="/"><img src="https://unpaz.edu.ar/sites/default/files/unpaz_logo_2020.png" alt="logo" /></NavLink>
                </div>
                <div className="header-container__nav">
                    <ul className="header-container__nav-items">
                        <li className="header-container__nav-items-item">
                            <NavLink to="/" className="nav-link" >Home</NavLink>
                        </li>
                        {/* <li className="header-container__nav-items-item">
                            <NavLink to="/login" className="nav-link" >Soy empresa</NavLink>
                        </li> */}
                        <li className="header-container__nav-items-item">
                            <NavLink to={userInfo?.user?.isRecruiter ? '/new-job' : '/login'} className="nav-link" >Publicar empleo</NavLink>
                        </li>
                        <li className="header-container__nav-items-item">
                            <NavLink to={userInfo ? '/new-cv' : '/login'} className="nav-link" >Cargar CV</NavLink>
                        </li>
                        {!userInfo ? (
                            <>
                                <li className="header-container__nav-items-item">
                                    <NavLink to="/register" className="nav-link" >Registrate</NavLink>
                                </li>
                                <li className="header-container__nav-items-item">
                                    <button className="header-container__nav-items-item-button">
                                        <NavLink to="/login" className="nav-link" >Ingresar</NavLink>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="header-container__nav-items-item">
                                    <NavLink to="/my-cv" className="nav-link" >Mi CV</NavLink>
                                </li>
                                <li className="header-container__nav-items-item">
                                    <button className="header-container__nav-items-item-button" >
                                        <p className="nav-link" onClick={logoutHandler}>Cerrar sesión</p> 
                                    </button>
                                </li>
                            </>
                        ) }

                    </ul>
                    

                </div>
            </div>

        </header>
        // <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        //     <ul className="navbar-nav mr-auto">
        //         <li className="nav-item">
        //             <NavLink to="/" className="nav-link" >Home</NavLink>
        //         </li>
        //     </ul>
        //     {!userInfo ?
        //     (<>
        //     <ul className="navbar-nav ml-auto">
        //         <li className="nav-item">
        //             <NavLink to="/login" className="nav-link" >Iniciar Sesión</NavLink>
        //         </li>
        //     </ul>
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <NavLink to="/register" className="nav-link" >Registrarse</NavLink>
        //         </li>
        //     </ul></>)
        //     :(
        //     <>
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <a className="nav-link">Bienvenido {userInfo.user.name}</a>
        //         </li>
        //     </ul>
        //     <ul className="navbar-nav">
        //         <li className="nav-item">
        //             <a className="nav-link" onClick={logoutHandler}>Cerrar Sesión</a>
        //         </li>
        //     </ul>
        //     </>
        //     )
        //     }
        // </nav>
    );
}

export default Navigation;