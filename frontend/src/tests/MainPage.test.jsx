import { render } from '@testing-library/react';
import MainPage from '../components/MainPage';
import { MemoryRouter } from 'react-router-dom';

test(`MainPage matches snapshot`, () => {
  const component = render(
    <MemoryRouter initialEntries={['/weather?location=Dubai']}>
      <MainPage />
    </MemoryRouter>);

  expect(component).toMatchSnapshot();
});