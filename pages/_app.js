import "../styles/globals.css";
import Meta from "../components/Meta";
import { AppContextProvider } from "../context/AppContext";
import { LoginContextProvider } from "../context/LoginContext";

function MyApp({ Component, pageProps }) {
  return (
      <AppContextProvider>
        <LoginContextProvider>
          <Meta />
          <Component {...pageProps} />
        </LoginContextProvider>
      </AppContextProvider>

  );
}

export default MyApp;
