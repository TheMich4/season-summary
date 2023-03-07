interface BoxProps {
  children: React.ReactNode;
}

const Box = ({ children }: BoxProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-slate-900 p-2 text-slate-100">
      {children}
    </div>
  );
};

export default Box;
