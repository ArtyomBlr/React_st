import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getAllComicses} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    }, [])

    const onRequest = (offset) => {
        getAllComicses(offset)
            .then((res) => onComicsListLoaded(res));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (comicsEnded.length < 9) {
            ended = true;
        }

        setComicsList(() => [...comicsList, ...newComicsList]);
        setNewItemLoading(() => false);
        setOffset((offset) => offset + 8)
        setComicsEnded(() => ended)
    }

    function renderItems(arr) {
        let items= arr.map((item) => {
            return (
                <li key={item.id} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading} 
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;