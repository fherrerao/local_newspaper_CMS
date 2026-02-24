import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/dashboard/page'; 

jest.mock('next/navigation', () => ({
    usePathname: () => '/',
}));

describe('Home Page Integration', () => {
    it('debe filtrar la tabla cuando se escribe en el buscador', async () => {
        render(<Home />);        
        expect(screen.getByText('Local Park Renovation Begins Next Month')).toBeInTheDocument();        
        const searchInput = screen.getByPlaceholderText('Search...');
        
        await userEvent.type(searchInput, 'Recycling Program');        
        expect(screen.queryByText('Local Park Renovation Begins Next Month')).not.toBeInTheDocument();        
        expect(screen.getByText('New Recycling Program Launches in March')).toBeInTheDocument();
    });
});