import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppMain from '../AppMain';
import { favouritesServiceMock } from './mock/favourites.service.mock'

describe(`AppMain test suite`, () => {
    beforeEach(() => {
        localStorage.setItem('user', JSON.stringify({username: 'Cristina'}));
    });
    
    test(`it updates the navigation when favourites change`, async () => {
        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <AppMain aFavouritesService={favouritesServiceMock}></AppMain>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        
        let dubaiLink = screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).toBeNull();

        act(() => {
            checkbox.click();
        });

        dubaiLink = screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).not.toBeNull();
        expect(dubaiLink).toHaveAttribute('href', '/weather?location=Dubai');
        
        act(() => {
            checkbox.click();
        });
        
        dubaiLink = screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).toBeNull();
    });

    test(`it updates the navigation when location is removed from favourites page`, async () => {
        render(
            <MemoryRouter initialEntries={['/favourites']}>
                <AppMain initialFavourites={['Dubai', 'London']} aFavouritesService={favouritesServiceMock}></AppMain>
            </MemoryRouter>);

            let dubaiLink = screen.queryByRole('link', {name: /Dubai/i });
            expect(dubaiLink).not.toBeNull();

            const removeImg = screen.getByTestId("Dubai");
            act(() => {
                removeImg.click();
            });

            dubaiLink = screen.queryByRole('link', {name: /Dubai/i });
            expect(dubaiLink).toBeNull();
    });
});