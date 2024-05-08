import { render } from '@testing-library/react';
import TellMePanel from '../components/TellMePanel';
import { MemoryRouter } from 'react-router-dom';


test(`TellMePanel matches snapshot`, () => {

  const component = render(
    <MemoryRouter initialEntries={['/weather?location=Dubai']}>
      <TellMePanel />
    </MemoryRouter>);

  expect(component).toMatchSnapshot();
});