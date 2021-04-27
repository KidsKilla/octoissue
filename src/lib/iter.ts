export const keyof = <T>(obj: T) => (Object.keys(obj) as unknown) as (keyof T)[]

export const keyVal = <T>(obj: T) =>
  (Object.entries(obj).map(([key, value]) => ({ key, value })) as unknown) as {
    [K in keyof T]-?: { key: K; value: T[K] }
  }[keyof T][]
