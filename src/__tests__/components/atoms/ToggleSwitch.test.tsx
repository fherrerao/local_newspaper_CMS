import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';

describe('ToggleSwitch Component', () => {
    it('debe renderizarse en color verde cuando isOn es true', () => {
        const { container } = render(<ToggleSwitch isOn={true} onToggle={jest.fn()} />);        
        const switchBackground = container.firstChild;
        expect(switchBackground).toHaveClass('bg-green-500');
    });

    it('debe renderizarse en color gris cuando isOn es false', () => {
        const { container } = render(<ToggleSwitch isOn={false} onToggle={jest.fn()} />);
        const switchBackground = container.firstChild;
        expect(switchBackground).toHaveClass('bg-gray-300');
    });

    it('debe llamar a onToggle al hacer clic', () => {
        const handleToggle = jest.fn();
        const { container } = render(<ToggleSwitch isOn={false} onToggle={handleToggle} />);

        fireEvent.click(container.firstChild as Element);
        expect(handleToggle).toHaveBeenCalledTimes(1);
    });
});