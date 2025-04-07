import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
    it('renders title', () => {
        render(<Header />);
        expect(screen.getByText(/Log Manager/i)).toBeInTheDocument();
      });
});