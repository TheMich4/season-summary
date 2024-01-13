interface SidebarSectionLabelProps {
  children: React.ReactNode;
}

export const SidebarSectionLabel = ({ children }: SidebarSectionLabelProps) => {
  return <div className="text-sm">{children}:</div>;
};
