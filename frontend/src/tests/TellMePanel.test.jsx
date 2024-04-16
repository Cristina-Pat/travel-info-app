import { render } from '@testing-library/react';
import TellMePanel from '../components/TellMePanel';

test(`TellMePanel matches snapshot`, () => {
  const component = render(<TellMePanel />);

  expect(component).toMatchSnapshot();
});