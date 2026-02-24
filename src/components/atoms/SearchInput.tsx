const SearchInput = ({ value, onChange, placeholder = "Search..." }: any) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border p-2 rounded text-black border-gray-300 bg-white"
        />
    );
}

export default SearchInput;
