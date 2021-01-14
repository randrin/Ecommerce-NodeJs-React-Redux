import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./components/routes/Routes";

const EcommerceApp = () => {
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Route component={Routes} />
      </BrowserRouter>
    </>
  );
};

export default EcommerceApp;
