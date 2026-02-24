import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Buttons';

describe('Button Component', () => {
    it('debe renderizar correctamente con el texto proporcionado', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('debe ejecutar la función onClick al ser presionado', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Save</Button>);

        fireEvent.click(screen.getByText('Save'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('no debe ejecutar onClick y debe tener opacidad cuando está disabled', () => {
        const handleClick = jest.fn();
        render(<Button disabled onClick={handleClick}>Update</Button>);

        const button = screen.getByText('Update');
        fireEvent.click(button);

        expect(handleClick).not.toHaveBeenCalled();
        expect(button).toHaveClass('opacity-50');
    });
});