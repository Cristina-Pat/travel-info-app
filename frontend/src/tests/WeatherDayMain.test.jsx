import { render, screen } from '@testing-library/react';
import WeatherDayMain from '../components/WeatherDayMain';

test(`WeatherDayMain shows temperature`, () => {
    const component = render(<WeatherDayMain 
        date="2nd Feb 2024"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("10 °C")).toBeInTheDocument();
});

test(`WeatherDayMain shows the day`, () => {
    const component = render(<WeatherDayMain 
        date="2nd Feb 2024"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("2nd Feb 2024")).toBeInTheDocument();
});

test(`WeatherDayMain shows the weather description`, () => {
    const component = render(<WeatherDayMain 
        date="2nd Feb 2024"
        temperature={10}
        description="overcast" />);

    expect(screen.getByText("overcast")).toBeInTheDocument();
});
