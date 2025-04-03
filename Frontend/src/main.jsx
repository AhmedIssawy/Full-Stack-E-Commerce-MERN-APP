import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes/AppRouter";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PayPalScriptProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </PayPalScriptProvider>
  </StrictMode>
);
