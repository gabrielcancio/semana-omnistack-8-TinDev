import React, { useState } from 'react';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import './styles.css';

function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

       try {
        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;  

        history.push(`/dev/${_id}`);
       } catch (errr) {
           alert('Erro ao cadastrar novo usuário. Tente novamente.')
       }
    }

    return(
        <div className="login-container">
            <img src={logoImg} alt="Tindev" />

            <form onSubmit={handleSubmit}>
                <input
                  placeholder="Seu GitHub username" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  />
                <button type="submit" className="button">Enviar</button>
            </form>
        </div>
    );
}

export default Login;