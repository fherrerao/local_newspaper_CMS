const ToggleSwitch = ({ isOn, onToggle }: any) => {
    return (
        <div
            onClick={onToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${isOn ? 'translate-x-6' : ''}`}></div>
        </div>
    );
}

export default ToggleSwitch;