import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardColumns } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FilterResults from 'react-filter-search';
import Episode from './component/Episode';
import "./component/style.css";

const url = 'https://rickandmortyapi.com/api/character/';

const episode = '/episode/';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
  }

  peticionesGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data.results });
    })
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };


  componentDidMount() {
    this.peticionesGet();
  }


  render() {

    const { data, value } = this.state;
    return (
        <Router>
          <div className="App">
            <h1>Bienbenido a rick y morty</h1>
            <div className='btn-group'>
              <Link to='/' className='btn btn-dark'>
                Ver personajes
            </Link>
            </div>
            <hr />
            <Switch>
              <Route path='/' exact>
                <div className='search'>
                  <label for="search" class="col-sm-2 col-form-label">Buscar</label>
                  <input type="text" id="search" class="form-control" placeholder="Coloca una palabra clave" value={value} onChange={this.handleChange} />
                  <FilterResults
                    value={value}
                    data={data}
                    renderResults={results => (
                      <div className='resultContainer'>
                        <hr />
                        <CardColumns id='cardsGroup'>
                          {results.map(character => (
                            <div className='result'>

                              <Card  id='card'>
                                <Card.Img variant="top" src={character.image} />
                                <Card.Body>
                                  <Card.Title><Card.Link id='linkTitulo' href={url + character.id} >{character.name}</Card.Link></Card.Title>

                                  <Card.Text>
                                    <div id={character.status}></div>
                                    {character.status}-{character.species}
                                  </Card.Text>
                                  <Card.Link id='linkLocation' href={character.location.url}>{character.location.name}</Card.Link>
                                  <Card.Text id='footer'><Link to={episode + character.id}>Episodios</Link></Card.Text>
                                </Card.Body>
                              </Card>

                            </div>
                          ))}
                        </CardColumns>
                      </div>
                    )}
                  />
                </div>
              </Route>
              <Route path='/episode/:id' component={Episode} />
            </Switch>
          </div>

        </Router>
    );
  }
}

export default App;
