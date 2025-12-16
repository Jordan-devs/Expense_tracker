import { Outlet, useLoaderData } from "react-router-dom";

const DashboardLayout = () => {
  const userData = useLoaderData();
  return (
    <div>
      <nav></nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;
