import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { router } from "./routes/routes";

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-center" />
      </Provider>
    </PersistGate>
  );
}

export default App;
