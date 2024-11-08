
export const remove = <T extends Object, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key>  => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<T, Key>;
}
