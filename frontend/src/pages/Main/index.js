import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

function Main({ match }) {
    const [devs, setDevs] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            });

            setDevs(response.data);
        }

        loadDevs();
    }, [match.params]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('match', dev => setMatchDev(dev));
        
    }, [match.params.id]);

    async function handleLike(target) {
        await api.post(`/devs/${target}/likes`, null,  {
            headers: {
                user: match.params.id
            }
        });

        setDevs(devs.filter(dev => dev._id !== target));
    }

    async function handleDislike(target) {
        await api.post(`/devs/${target}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        });

        setDevs(devs.filter(dev => dev._id !== target));
    }

    return(
        <div className="main-container">
            <Link to="/">
                <img src={logoImg} alt="Tindev"/>
            </Link>

            { devs.length > 0 ? (
             <ul>
                {devs.map(dev => (
                <li key={dev._id}>
                    <img src={dev.avatar} alt={dev.name}/>
                    <footer>
                        <strong>{dev.name}</strong>
                        <p>{dev.bio}</p>
                    </footer>
                    <div className="buttons">
                        <button onClick={() => handleLike(dev._id)} type="button">
                            <img src={like} alt="Like"/>
                        </button>
                        <button onClick={() => handleDislike(dev._id)} type="button">
                            <img src={dislike} alt="Dislike"/>
                        </button>
                    </div>
                </li>
                ))}
             </ul>
            ) : (
                <div className="empty">
                    Acabou :(
                </div>
            ) }

            { matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match"/>

                    <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button onClick={() => setMatchDev(null)} type="button">FECHAR</button>
                </div>
            ) }

        </div>
    );
}

export default Main;