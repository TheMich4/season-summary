interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ children, disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`rounded-sm border border-slate-600 ${
        disabled ? "border-gray-900 bg-gray-800" : "active:bg-slate-900"
      }  bg-slate-700 px-2 hover:bg-slate-800`}
    >
      {children}
    </button>
  );
};

export default Button;
