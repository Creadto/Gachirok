interface SidebarItemProps {
  isActive : boolean;
  onClick : () => void;
  activeIcon : JSX.Element;
  inactiveIcon: JSX.Element;
  label: string
}

const SidebarItem = ({ isActive, onClick, activeIcon, inactiveIcon, label }:SidebarItemProps) => {
  return (
    <div className="flex h-[44px] justify-center items-center">
      <div
        className={`h-[36px] flex w-full mx-[10px] items-center justify-center ${
          isActive ? "bg-[#FFE9EA]" : ""
        } `}
      >
        <button onClick={onClick}>
          <div className="w-[190px] h-[20px] flex flew-row space-x-[8px]">
            {isActive ? activeIcon : inactiveIcon}
            <div
              className={`text-[14px] ${
                isActive ? "text-[#E62A2F] font-semibold" : "text-[#808080]"
              } `}
            >
              {label}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};


export default SidebarItem