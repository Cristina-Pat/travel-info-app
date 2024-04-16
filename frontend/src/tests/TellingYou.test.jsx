//import { screen } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import TellingYou from '../components/TellingYou';

describe(`TellingYou test suite`, () => {
    test(`it should render a title saying 'Telling you about...'`, () => {
        render(<TellingYou about="London"></TellingYou>);
        expect(screen.getByText("Telling you about...")).toBeInTheDocument();
    });

    test(`it should render the about property`, () => {
        render(<TellingYou about="London"></TellingYou>);
        expect(screen.getByText("London")).toBeInTheDocument();
    });
});