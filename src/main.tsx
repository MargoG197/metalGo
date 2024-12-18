import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";
import { TodoProvider } from "./context/todoContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TodoProvider>
  </StrictMode>
);
