import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharactersAction, nextCharacter, beforeCharacter } from '../redux/charactersDuck';
import { Card, CardColumns } from 'react-bootstrap';
import "../styles/styles.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Episode from './Episode';

const url = 'https://rickandmortyapi.com/api/character/';

const episode = '/episode/';

const Characters = () => {

    const dispatch = useDispatch();

    const characters = useSelector(store => store.characters.characters)


    return (
        <Router>
            <div>
                <center>
                    <table>
                        <tr>
                            <th><button class="btn btn-outline-secondary" onClick={() => dispatch(beforeCharacter())}> Anteriro </button></th>
                            <th><Link to='/'><button class="btn btn-outline-secondary" onClick={() => dispatch(getCharactersAction())}>Ver personajes</button></Link></th>
                            <th><button class="btn btn-outline-secondary" onClick={() => dispatch(nextCharacter())}>Sigiente</button></th>

                        </tr>
                    </table>
                </center>
                <hr></hr>

                <CardColumns id='cardsGroup'>
                    <center>
                        {
                            characters.map(c => (
                                <Switch>
                                    <Route path='/' exact>
                                        <Card id='card'>
                                            <Card.Img id='imageCharacter' variant="top" src={c.image} />
                                            <Card.Body>
                                                <Card.Title><Card.Link id='linkTitulo' href={url + c.id} >{c.name}</Card.Link></Card.Title>
                                                <Card.Text>
                                                    <div id={c.status}></div>
                                                    {c.status}-{c.species}
                                                </Card.Text>
                                                <Card.Link id='linkLocation' href={c.location.url}>{c.location.name}</Card.Link>
                                                <Card.Text id='footer'><Link to={episode + c.id}>Episodios</Link></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Route>
                                </Switch>
                            ))
                        }
                    </center>
                </CardColumns>
                <Switch>
                    <Route path='/episode/:id' component={Episode} />
                </Switch>
            </div>
        </Router>
    )
}

export default Characters;