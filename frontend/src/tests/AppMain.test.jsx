import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppMain from '../AppMain';

describe(`AppMain test suite`, () => {
    test(`it updates the navigation when favourites change`, async () => {
        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <AppMain></AppMain>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        
        let dubaiLink = await screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).toBeNull();

        act(() => {
            checkbox.click();
        });

        dubaiLink = await screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).not.toBeNull();
        expect(dubaiLink).toHaveAttribute('href', '/weather?location=Dubai');
        
        act(() => {
            checkbox.click();
        });
        
        dubaiLink = await screen.queryByRole('link', {name: /Dubai/i });
        expect(dubaiLink).toBeNull();
    });

    test(`it updates the navigation when location is removed from favourites page`, async () => {
        render(
            <MemoryRouter initialEntries={['/favourites']}>
                <AppMain initialFavourites={['Dubai', 'London']}></AppMain>
            </MemoryRouter>);


            let dubaiLink = await screen.queryByRole('link', {name: /Dubai/i });
            expect(dubaiLink).not.toBeNull();

            const removeImg = await screen.getByTestId("Dubai");
            act(() => {
                removeImg.click();
            });

            dubaiLink = await screen.queryByRole('link', {name: /Dubai/i });
            expect(dubaiLink).toBeNull();
    });
});