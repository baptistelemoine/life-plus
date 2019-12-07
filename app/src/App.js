import React from "react";
import MainLayout from "./modules/main";

import AdminPage from "./modules/admin";
import Products from "./modules/admin/products";

export default function App() {
  return (
    <MainLayout>
      <AdminPage>
        <Products />
      </AdminPage>
    </MainLayout>
  );
}
