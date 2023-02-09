import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../components/auth";
import FallBackSpinner from "../components/fallback-spinner";
import Layout from "../pages/layout";
import ROUTES from "./ROUTES";

const PageNotFound = lazy(() => import("../pages/page-not-found"));

function Router() {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          title={route.title}
          element={
            <Auth>
              {route.isProtected ? (
                <Suspense fallback={<FallBackSpinner />}>
                  <Layout children={route.element} />
                </Suspense>
              ) : (
                <Suspense fallback={<FallBackSpinner />}>
                  {route.element}
                </Suspense>
              )}
            </Auth>
          }
        />
      ))}

      <Route
        path="*"
        element={
          <Suspense fallback={<FallBackSpinner />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default Router;
