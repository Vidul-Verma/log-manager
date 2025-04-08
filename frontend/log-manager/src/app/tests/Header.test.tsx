import { render, screen,  } from '@testing-library/react';
import HomePage from '../page';
import { useLogsQuery } from '../hooks/useLogsQuery';
import Cookies from 'js-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock external dependencies
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('../hooks/useLogsQuery');

// jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);

// jest.mock('../components/LogCard', () => ({ log, onDelete }: any) => (
//   <div data-testid="log-card">{log.description}</div>
// ));

const mockUseLogsQuery = useLogsQuery as jest.Mock;

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

it('displays loading message while fetching logs', () => {
    (Cookies.get as jest.Mock).mockReturnValue('mock-token');
    mockUseLogsQuery.mockReturnValue({ data: null, isLoading: true });
  
    renderWithClient(<HomePage />);
  
    expect(screen.getByText(/loading logs/i)).toBeInTheDocument();
  });

  it('renders log cards after successful fetch', () => {
    (Cookies.get as jest.Mock).mockReturnValue('mock-token');
    mockUseLogsQuery.mockReturnValue({
      data: {
        logs: [
          { _id: '1', description: 'Log A' },
          { _id: '2', description: 'Log B' },
        ],
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
      },
      isLoading: false,
    });
  
    renderWithClient(<HomePage />);
  
    expect(screen.getAllByTestId('log-card')).toHaveLength(2);
    expect(screen.getByText('Log A')).toBeInTheDocument();
    expect(screen.getByText('Log B')).toBeInTheDocument();
  });

  it('disables pagination buttons when only one page is available', () => {
    (Cookies.get as jest.Mock).mockReturnValue('mock-token');
    mockUseLogsQuery.mockReturnValue({
      data: {
        logs: [],
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
      },
      isLoading: false,
    });
  
    renderWithClient(<HomePage />);
  
    const prev = screen.getByText('Previous') as HTMLButtonElement;
    const next = screen.getByText('Next') as HTMLButtonElement;
  
    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(true);
  });

  it('renders the Add Log button with correct link', () => {
    (Cookies.get as jest.Mock).mockReturnValue('mock-token');
    mockUseLogsQuery.mockReturnValue({
      data: { logs: [], currentPage: 1, totalPages: 1, hasNextPage: false },
      isLoading: false,
    });
  
    renderWithClient(<HomePage />);
  
    const link = screen.getByRole('link', { name: /\+ add log/i });
    expect(link).toHaveAttribute('href', '/add');
  });