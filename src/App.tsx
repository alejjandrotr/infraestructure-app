import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import CategoriasSalasAdminPage from "./pages/CategoriaSalas/sala-admin.page";
import SalasAdminPage from "./pages/Salas/sala-admin.page";
import DefaultLayout from "./components/layout/DefaultLayout";
import PageTitle from "./components/PageTitle";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/sala"
          element={
            <>
              <PageTitle title="Salas del Cine | CineAdmin" />
              <SalasAdminPage />
            </>
          }
        />

        <Route
          path="/categoria-sala"
          element={
            <>
              <PageTitle title="Categorias de las Salas del Cine | CineAdmin" />
              <CategoriasSalasAdminPage />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
