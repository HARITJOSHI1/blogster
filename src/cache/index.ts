/* eslint-disable @typescript-eslint/no-unsafe-return */
import { redis } from "./redis";

const fetch = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  expires: number
) => {
  const existing = get<T>(key);
  if (existing !== null) return existing;
  return set(key, fetcher, expires);
};

const get = async <T>(key: string): Promise<T | null> => {
  const value = await redis.get(key);
  if (value === null) return null;
  return JSON.parse(value);
};

const set = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  expires: number
) => {
  const value = await fetcher();

  console.log("Redis value to be set: ", value);

  await redis.set(key, JSON.stringify(value), "EX", expires);
  return value;
};

export { fetch, set };
