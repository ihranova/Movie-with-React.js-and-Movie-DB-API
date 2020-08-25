import React, { useState } from 'react';

//import elements
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreBtn from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';
import { useHomeFetch } from './hooks/useHomeFetch';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, SEARCH_BASE_URL, POPULAR_BASE_URL } from '../config';
import noImage from './images/no_image.jpg';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [{ state: { movies, currentPage, totalPages, heroImage }, loading, error }, fetchMovies] = useHomeFetch(searchTerm);
    //console.log('State', movies);

    const searchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
        setSearchTerm(search);
        fetchMovies(endpoint);
    }

    const loadMoreMovies = () => {
        const searchPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
        const popularPoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

        const endpoint = searchTerm ? searchPoint : popularPoint;
        fetchMovies(endpoint);
        //console.log('loaded');

    }

    if (error) return <div>Something went wrong...</div>
    if (!movies[0]) return <Spinner />
    return (
        <>
            {!searchTerm &&
                <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview} />
            }
            <SearchBar searchMovies={searchMovies} inputValue={searchTerm} />
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                {movies.map((movie,idx) => (
                    <MovieThumb
                        key={idx}
                        clickable
                        image={
                            movie.poster_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                : noImage
                        }
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {currentPage < totalPages && !loading && (
                <LoadMoreBtn text={'Load more'} callback={loadMoreMovies} />
            )}
        </>
    )
}
export default Home;