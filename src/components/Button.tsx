interface ButtonProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
  iconSide?: "left" | "right";
  disabled?: boolean;
  width?: string;
}

const Button = ({ onClick, text, icon, iconSide, disabled, width }: ButtonProps) => {
  return (
    <button
      style={{ width: width ? width : "100%" }}
      className={`font-extrabold text-[18px] rounded-lg  py-2.5 transition-all duration-200 ${
        disabled
          ? "text-white/40 border-white/5 cursor-not-allowed pointer-events-none border border-dashed"
          : "text-white/80  border-t border-white/40 hover:text-white/60 hover:border-white/20 cursor-pointer bg-gradient-to-br from-[#6DBF1D] to-[#498013]"
      }`}
      onClick={onClick}
      // disabled={disabled}
    >
      {iconSide === "left" && icon}
      {text}
      {iconSide === "right" && icon}
    </button>
  );
};

export default Button;
