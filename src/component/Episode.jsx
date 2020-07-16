import React, { Component } from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default class Episode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            perPage: 10,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }



    peticionesGet = () => {
        axios.get(`https://rickandmortyapi.com/api/character/${this.props.match.params.id}`).then(response => {
            this.setState({ data: response.data.episode });
            const data = response.data;
            const slice = data.episode.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(character =>
                <React.Fragment>
                    <center>
                        <ul lass='list-group'>
                            <li class="list-group-item list-group-item-action"><a href={character}>{character}</a></li>
                        </ul>
                    </center>
                </React.Fragment>
            )
            this.setState({
                pageCount: Math.ceil(data.episode.length / this.state.perPage),
                postData
            })
        });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.peticionesGet()
        });

    };

    componentDidMount() {
        this.peticionesGet();
    }

    render() {
        return (
            <div className='paginator'>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"<< "}
                    nextLabel={" >>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        );
    }
}
