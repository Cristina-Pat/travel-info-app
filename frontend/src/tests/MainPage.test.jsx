import { render } from '@testing-library/react';
import MainPage from '../components/MainPage';

test(`MainPage matches snapshot`, () => {
  const component = render(<MainPage />);

  expect(component).toMatchSnapshot();
});