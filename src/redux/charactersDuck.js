import axios from 'axios';

const dataInicial = {
    characters: [],
    offset: 1,
    id: 0
}

const GET_CHARACTERS = 'GET_CHARACTERS'
const NEXT_CHARACTERS = 'NEXT_CHARACTERS'
const BEFORE_CHARACTERS = 'BEFORE_CHARACTERS'
const GET_CHARACTERS_BYID = 'GET_CHARACTERS_BYID'

export default function characterReducer(state = dataInicial, action) {

    switch (action.type) {
        case GET_CHARACTERS:
            return { ...state, characters: action.payload }
        case NEXT_CHARACTERS:
            return { ...state, characters: action.payload.characters, offset: action.payload.offset }
        case BEFORE_CHARACTERS:
            return { ...state, characters: action.payload.characters, offset: action.payload.offset }
        case GET_CHARACTERS_BYID:
            return { ...state, characters: action.payload }
        default:
            return state
    }

}

export const getCharactersAction = () => async (dispatch, getState) => {

    const offset = 1;

    try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${offset}`)
        dispatch({
            type: GET_CHARACTERS,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}

export const nextCharacter = () => async (dispatch, getState) => {
    const offset = getState().characters.offset;
    const sigueinte = offset + 1;
    try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${sigueinte}`)
        dispatch({
            type: NEXT_CHARACTERS,
            payload: {
                characters: res.data.results,
                offset: sigueinte
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const beforeCharacter = () => async (dispatch, getState) => {
    const offset = getState().characters.offset;
    const anteriro = offset - 1;
    try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${anteriro}`)
        dispatch({
            type: BEFORE_CHARACTERS,
            payload: {
                characters: res.data.results,
                offset: anteriro
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getById = (id) => async (dispatch, getState) => {
    if (id) {
        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            dispatch({
                type: GET_CHARACTERS_BYID,
                payload: res.data.results.characters
            })
        } catch (error) {
            console.log(error)
        }
    } else {

        const offset = 1;

        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${offset}`)
            dispatch({
                type: GET_CHARACTERS,
                payload: res.data.results
            })
        } catch (error) {
            console.log(error)
        }
    }

}
