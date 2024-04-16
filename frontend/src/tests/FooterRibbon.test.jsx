import { render } from '@testing-library/react';
import FooterRibbon from '../components/FooterRibbon';

test(`FooterRibbon matches snapshot`, () => {
  const component = render(<FooterRibbon />);

  expect(component).toMatchSnapshot();
});