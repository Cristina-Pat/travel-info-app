import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import WeatherPage from "../components/WeatherPage";

describe(`WeatherPage test suite`, () => {
    test(`it should call a function when add to favourites is selected'`, () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <WeatherPage onAddFavourite={mockCallback}></WeatherPage>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        checkbox.click(checkbox);

        expect(mockCallback).toHaveBeenCalled();
    });

    test(`it should pass the location to the callback function when add to favourites is selected'`, () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <WeatherPage onAddFavourite={mockCallback}></WeatherPage>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        checkbox.click(checkbox);

        expect(mockCallback).toHaveBeenCalledWith('Dubai');
    });

    test(`it should show the favourite checkbox as checked when the location is favourite'`, () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <WeatherPage onAddFavourite={mockCallback} favouriteLocations={['Dubai']}></WeatherPage>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        
        expect(checkbox).toBeChecked();
    });

    test(`it should call a function when add to favourites is deselected'`, () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <WeatherPage onRemoveFavourite={mockCallback} favouriteLocations={['Dubai']}></WeatherPage>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        checkbox.click(checkbox);

        expect(mockCallback).toHaveBeenCalled();
    });

    test(`it should pass the location to the callback function when add to favourites is deselected'`, () => {
        const mockCallback = vi.fn();

        render(
            <MemoryRouter initialEntries={['/weather?location=Dubai']}>
                <WeatherPage onRemoveFavourite={mockCallback} favouriteLocations={['Dubai']}></WeatherPage>
            </MemoryRouter>);
        const checkbox = screen.getByLabelText(/Click to add to favourites/i);
        checkbox.click(checkbox);

        expect(mockCallback).toHaveBeenCalledWith('Dubai');
    });
});