/* eslint-disable @typescript-eslint/no-unsafe-argument */

export const formatLabel = <T>(l: keyof T & string) => {
  const strs = l.split("");
  strs[0] = strs[0]?.toUpperCase() as string;
  return strs.join("");
};
