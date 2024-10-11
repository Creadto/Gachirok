interface CostlyDetailsButtonProps {
    value: boolean,
    title: string,

    onClick:() => void;
}

const CostlyDetailsButton: React.FC<CostlyDetailsButtonProps> = ({value, title, onClick}: CostlyDetailsButtonProps) => {
    return (
        <button
        type="button"
        className={`border border-slate-500 rounded-md border-solid ${
          value
            ? "bg-black text-white"
            : "bg-white text-slate-500"
        }`}
        onClick={onClick}
      >
        {title}
      </button>
      );
}
export default CostlyDetailsButton