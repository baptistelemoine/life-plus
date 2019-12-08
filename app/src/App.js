import React from "react";
import MainLayout from "./modules/main";
import AdminPage from "./modules/admin";
import Products from "./modules/admin/products";
import { SWRConfig } from "swr";

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <MainLayout>
        <AdminPage>
          <Products />
        </AdminPage>
      </MainLayout>
    </SWRConfig>
  );
}
