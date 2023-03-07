import Box from "~/components/Box";
import type { MemberData } from "~/types";

interface HeaderProps {
  memberData: MemberData;
}

const Header = ({ memberData }: HeaderProps) => {
  return (
    <Box>
      <div className="flex flex-row items-center gap-2">
        <div className="font-bold">{memberData.displayName}</div>
        <div className="text-center text-xs font-light text-slate-300">
          ({memberData.custId})
        </div>
      </div>
      <div className="text-sm text-slate-300">{memberData.clubName}</div>
    </Box>
  );
};

export default Header;
