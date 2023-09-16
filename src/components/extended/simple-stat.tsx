import { Delta } from "../common/Delta";

interface SimpleStatProps {
  label: string;
  value: string | number;
  previous?: number | null;
  invert?: boolean;
}

export const SimpleStat = ({
  label,
  value,
  previous = null,
  invert = false,
}: SimpleStatProps) => {
  return (
    <div className="flex w-full flex-col rounded-md border p-4 text-start">
      <div className="pb-2 text-base font-normal tracking-tight">{label}</div>
      <div className="flex flex-row items-baseline gap-1 text-2xl font-bold">
        <p>{value}</p>
        {previous && previous !== 0 ? (
          <p className="text-sm">
            <Delta
              value={value as number}
              previous={previous as number}
              invert={invert}
            />
          </p>
        ) : null}
      </div>
    </div>
  );
};
