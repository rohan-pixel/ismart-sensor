import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import RegisterPage from "./Pages/RegisterPage";
import Myasset from "./Pages/Myasset";
import Addasset from "./Pages/Addasset";
import Editasset from "./Pages/Editasset";
import Configure from "./Pages/Configure";
import Dashboard from "./Pages/Dashboard";
import AuthProtectedRoutes from "./Routes/AuthProtectedRoutes";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/">
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegisterPage />} />
          {/* <Route path="nav" element={<Navbar />} /> */}

          {/* -----------------------Authenticated Protected-------------------- */}
          <Route element={<AuthProtectedRoutes />}>
            <Route path="/" element={<Myasset />} />
            <Route path="/live-data" element={<Dashboard />} />
            <Route path="/add/asset" element={<Addasset />} />
            <Route path="/edit/asset" element={<Editasset />} />
            <Route path="/configure" element={<Configure />} />
          </Route>

          {/* ---------------------------Page Not Found---------------------------- */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
