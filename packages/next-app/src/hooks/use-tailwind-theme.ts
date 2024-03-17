import resolveConfig from "tailwindcss/resolveConfig";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import tailwindConfig from "../../tailwind.config";

export const useTailwindTheme = () => {
  const fullConfig = resolveConfig(tailwindConfig);

  return fullConfig.theme;
};
