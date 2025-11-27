import { ToastProvider } from "./Components/Toast";
import { AppRouter } from "./Routes";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />

      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </>
  );
}

export default App;
