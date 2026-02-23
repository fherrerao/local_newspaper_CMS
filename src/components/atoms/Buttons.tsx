const Button = ({ children, onClick, disabled, variant = 'primary' }: any) => {
    const bgColor = variant === 'secondary' ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white';
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded ${bgColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}

export default Button;