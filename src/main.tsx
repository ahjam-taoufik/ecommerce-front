import ReactDOM from "react-dom/client";

import AppRouter from "@routes/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/globalStyle.css";
import { Provider } from "react-redux";
import { persistor, store } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";
import "./services/axios-global";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
