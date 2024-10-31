interface MoreButtonProps {
  color: string;
}

export const MoreButton = ({ color }: MoreButtonProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.288 15a1.712 1.712 0 1 0 3.424 0 1.712 1.712 0 0 0-3.424 0zM20.27 15a1.712 1.712 0 1 0 3.424 0 1.712 1.712 0 0 0-3.424 0zM6.305 15a1.712 1.712 0 1 0 3.424 0 1.712 1.712 0 0 0-3.424 0z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};