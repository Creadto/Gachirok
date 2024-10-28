interface CostlyDetailsButtonProps {
    value: boolean | undefined,
    title: string,

    onClick:() => void;
}

const CostlyDetailsButton: React.FC<CostlyDetailsButtonProps> = ({value, title, onClick}: CostlyDetailsButtonProps) => {
    return (
        <button
        type="button"
        className={`border border-[#EEEEEE] rounded-[50px] px-[12px] py-[9px] ${
          value
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={onClick}
      >
        {title}
      </button>
      );
}
export default CostlyDetailsButton