interface ButtonProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
  iconSide?: "left" | "right";
  disabled?: boolean;
  width?: string;
  background?: string;
  btnValue?: number;
}

const Button = ({
  onClick,
  text,
  icon,
  iconSide,
  disabled,
  width,
  background,
  btnValue,
}: ButtonProps) => {
  return (
    <button
      style={{
        width: width ? width : "100%",
        background: background
          ? background
          : disabled
          ? "none"
          : "linear-gradient(to bottom, #6DBF1D 0%, #498013 100%)",
      }}
      className={`flex items-center justify-center gap-1 max-h-[53px] sm:gap-2 rounded-lg  py-2.5 transition-all duration-200 ${
        disabled
          ? "text-white/40 border-white/20 cursor-not-allowed pointer-events-none border border-dashed"
          : "text-white/80  border-t border-white/40 hover:text-white/60 hover:border-white/20 cursor-pointer"
      }`}
      onClick={onClick}
      // disabled={disabled}
    >
      {iconSide === "left" && icon}
      <p className="font-extrabold text-white/80 text-[12px] sm:text-[18px]">
        {text}
      </p>
      {iconSide === "right" && icon}
      {iconSide === "right" && btnValue && (
        <span className="font-extrabold text-white/80 text-[12px] sm:text-[18px]">
          {btnValue}
        </span>
      )}
    </button>
  );
};

export default Button;
