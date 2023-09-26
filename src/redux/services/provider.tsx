import { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

type childrenProps = {
  children: ReactNode | undefined;
};
export default function AppStoreProvider({ children }: childrenProps) {
  return <Provider store={store}>{children}</Provider>;
}
