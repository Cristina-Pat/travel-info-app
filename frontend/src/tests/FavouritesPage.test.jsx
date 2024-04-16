import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavouritesPage from '../components/FavouritesPage';

describe(`FavouritesPage test suite`, () => {
    test(`it shows the favourites list`, async () => {
        render(
            <MemoryRouter initialEntries={['/favourites']}>
                <FavouritesPage favouriteLocations={['London', 'Dubai']}></FavouritesPage>
            </MemoryRouter>);
        
        expect(screen.getByText("London")).toBeInTheDocument();
        expect(screen.getByText("Dubai")).toBeInTheDocument();
    });

    test(`it calls onRemoveFavourite callback when clicking on an favourite image and passes the correct location`, async () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/favourites']}>
                <FavouritesPage 
                    favouriteLocations={['London', 'Dubai']}
                    onRemoveFavourite={mockCallback}
                    ></FavouritesPage>
            </MemoryRouter>);
        
        const removeImg = await screen.getByTestId("Dubai");
        removeImg.click();

        expect(mockCallback).toHaveBeenCalledWith('Dubai');
    });

});