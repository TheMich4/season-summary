interface SidebarSectionLabelProps {
  children: React.ReactNode;
}

export const SidebarSectionLabel = ({ children }: SidebarSectionLabelProps) => {
  return <div className="ml-2 text-sm">{children}:</div>;
};
