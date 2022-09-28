import "../styles/globals.css";
import Meta from "../components/Meta";
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from "../context/AppContext";
import { LoginContextProvider } from "../context/LoginContext";

function MyApp({ Component, pageProps }) {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <LoginContextProvider>
          <Meta />
          <Component {...pageProps} />
        </LoginContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default MyApp;
