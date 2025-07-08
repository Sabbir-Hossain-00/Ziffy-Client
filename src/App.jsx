import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Router/Router";
import { AuthProvider } from "./Context/AuthContext";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
