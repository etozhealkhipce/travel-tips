
export type PageStartedPayload<TData = void> = {
  params: Record<string, string>;
  data: TData;
};
