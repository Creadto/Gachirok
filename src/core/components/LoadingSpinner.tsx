import { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";

interface LoadingSpinnerProps {
  loading: boolean
}
export const LoadingSpinner = ({loading} : LoadingSpinnerProps) => {

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#e62a2f",
  };

  return (
    <BarLoader
          cssOverride={override}
          height={10}
          width={300}
          color={"#e62a2f"}
          loading={loading}
          speedMultiplier={1.5}
          
        />
  );
};