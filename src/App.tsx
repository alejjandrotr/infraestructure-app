import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loader from "./common/Loader";
import CategoriasSalasAdminPage from "./pages/CategoriaSalas/sala-admin.page";
import SalasAdminPage from "./pages/Salas/sala-admin.page";
import DefaultLayout from "./components/layout/DefaultLayout";
import PageTitle from "./components/PageTitle";
import UsersAdminPage from "./pages/Usuarios/users-admin.page";
import AsientosAdminPage from "./pages/Asientos/asientos-admin.page";
import SignInPage from "./pages/Authentication/SignIn";
import { AuthProvider, useAuth } from "./core/Users/context/auth.context";
import { PrivateRoute } from "./components/routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <AppElement />
    </AuthProvider>
  );
}

function AppElement() {
  const navigate = useNavigate()
  const { isLogin } = useAuth();
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
        <Route element={<PrivateRoute />}>
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
            path="/sala/:idSala/asientos"
            element={
              <>
                <PageTitle title="Asientos del Cine | CineAdmin" />
                <AsientosAdminPage />
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

          <Route
            path="/users"
            element={
              <>
                <PageTitle title="Usuario del Cine | CineAdmin" />
                <UsersAdminPage />
              </>
            }
          />
        </Route>
        <Route
          path="/auth/sign-in"
          element={
            isLogin() ? (
              <Navigate to="/sala" replace />
            ) : (
              <>
                <PageTitle title="Login | CineAdmin" />
                <SignInPage {...{navigate}} />
              </>
            )
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
