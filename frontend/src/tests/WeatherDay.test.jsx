import { render, screen } from '@testing-library/react';
import WeatherDay from '../components/WeatherDay';

test(`WeatherDay shows temperature`, () => {
    const component = render(<WeatherDay 
        day="Fri"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("10 °C")).toBeInTheDocument();
});

test(`WeatherDay shows the day`, () => {
    const component = render(<WeatherDay 
        day="Fri"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("Fri")).toBeInTheDocument();
});

test(`WeatherDay shows the weather description`, () => {
    const component = render(<WeatherDay 
        day="Fri"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("overcast")).toBeInTheDocument();
});
