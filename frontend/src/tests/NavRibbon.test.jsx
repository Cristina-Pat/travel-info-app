import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NavRibbon from "../components/NavRibbon";

describe(`NavRibbon test suite`, () => {
    test(`it should render Home link'`, () => {
        render(<NavRibbon favouriteLocations={[]}></NavRibbon>, { wrapper: MemoryRouter });

        const homeLink = screen.getByText(/Home/i);
        expect(homeLink).toHaveAttribute(`href`, `/`);
    });

    test(`it should not render 'My Saved Locations' if there are not saved locations`, async () => {
        render(<NavRibbon favouriteLocations={[]}></NavRibbon>, { wrapper: MemoryRouter });

        const savedLocationsButton = await screen.queryByText(/My Saved Locations/i);
        expect(savedLocationsButton).toBeNull();
    });
    
    test(`it should render 'My Saved Locations' if there are saved locations`, async () => {
        render(<NavRibbon favouriteLocations={['Barcelona']}></NavRibbon>, { wrapper: MemoryRouter });

        const savedLocationsButton = await screen.queryByText(/My Saved Locations/i);
        expect(savedLocationsButton).not.toBeNull();
    });

    test(`it should render links to the saved locations`, async () => {
        render(<NavRibbon favouriteLocations={['Barcelona']}></NavRibbon>, { wrapper: MemoryRouter });

        const barcelonaLink = await screen.queryByText(/Barcelona/i);
        expect(barcelonaLink).not.toBeNull();
        expect(barcelonaLink).toHaveAttribute('href', '/weather?location=Barcelona');
    });
});