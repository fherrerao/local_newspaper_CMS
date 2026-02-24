import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AsidePanel from '@/components/organism/AsidePanel';

describe('AsidePanel Integration', () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debe mantener el botón Save deshabilitado si faltan campos por llenar', async () => {
        render(
            <AsidePanel
                isOpen={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                isEditing={true}
                article={null}
            />
        );

        const saveButton = screen.getByRole('button', { name: /Save/i });
        expect(saveButton).toBeDisabled();

        const headlineInput = screen.getByLabelText(/Headline \*/i);
        await userEvent.type(headlineInput, 'Nuevo Artículo');        
        expect(saveButton).toBeDisabled();
    });

    it('debe habilitar el botón Save cuando todos los campos son válidos', async () => {
        render(
            <AsidePanel
                isOpen={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                isEditing={true}
                article={null}
            />
        );
        
        await userEvent.type(screen.getByLabelText(/Headline \*/i), 'Gran Noticia');
        await userEvent.type(screen.getByLabelText(/Author \*/i), 'Fernando');
        fireEvent.change(screen.getByLabelText(/Publication Date \*/i), { target: { value: '2026-03-01' } });
        await userEvent.type(screen.getByLabelText(/Body \*/i), 'Contenido detallado de la noticia.');

        const saveButton = screen.getByRole('button', { name: /Save/i });        
        expect(saveButton).not.toBeDisabled();
        
        fireEvent.click(saveButton);
        expect(mockOnSave).toHaveBeenCalledTimes(1);
        expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
            headline: 'Gran Noticia',
            author: 'Fernando',
            publishDate: '2026-03-01',
            published: false
        }));
    });
});