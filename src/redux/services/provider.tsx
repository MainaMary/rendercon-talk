import { store } from "./store";
import { Provider } from "react-redux";
import { childrenProps } from "../../model/types";
export default function AppStoreProvider({ children }: childrenProps) {
  return <Provider store={store}>{children}</Provider>;
}
