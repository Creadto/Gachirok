interface ToggleButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    bgColor: string;
  }
  
  const ToggleButton: React.FC<ToggleButtonProps> = ({
    label,
    isActive,
    onClick,
    bgColor,
  }) => {
    return (
      <button
        type="button"
        className={`py-2 px-4 border rounded-lg cursor-pointer focus:outline-none ${isActive ? bgColor + " text-white" : "bg-gray-100"}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

  export default ToggleButton