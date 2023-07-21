import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import mockServer from '../_mocks_/mockServer';
import Movie from '../components/Movie';

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test('renders the correct movie', async () => {
    const MOVIE_ID = '573a1390f29313caabcd42e8';
    const NUMBER_OF_REVIEWS = 2;
    const TITLE_OF_MOVIE = 'The Great Train Robbery';
    const REVIEWS_CLASS = 'reviewsText';
    
    const { container } = render (
        <MemoryRouter initialEntries={[`/movies/${MOVIE_ID}`]}>
            <Routes>
                <Route path="/movies/:id" element={
                    <Movie />}
                />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText(TITLE_OF_MOVIE));
    const titleText = screen.getByText(TITLE_OF_MOVIE);
    const reviews = container.getElementsByClassName(REVIEWS_CLASS );
    expect(titleText).toBeInTheDocument();
    expect(reviews.length).toBe(NUMBER_OF_REVIEWS);
});