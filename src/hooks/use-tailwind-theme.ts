import resolveConfig from "tailwindcss/resolveConfig";
// @ts-ignore
import tailwindConfig from "../../tailwind.config";

export const useTailwindTheme = () => {
  const fullConfig = resolveConfig(tailwindConfig);

  return fullConfig.theme;
};
