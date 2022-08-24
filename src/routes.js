
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import Customers from "views/Customers";
import OutputInvoice from "views/OutputInvoice";
import InputInvoice from "views/InputInvoice";
import Services from "views/Services";
import Offer from "views/Offer";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Kontrolna ploča",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/user-page",
    name: "Profil",
    icon: "users_circle-08",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Kupci",
    icon: "users_single-02",
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Usluge",
    icon: "ui-2_settings-90",
    component: Services,
    layout: "/admin",
  },
  {
    path: "/output-invoice",
    name: "Izlazni računi",
    icon: "files_paper",
    component: OutputInvoice,
    layout: "/admin",
  },
  {
    path: "/input-invoice",
    name: "Ulazni računi",
    icon: "files_single-copy-04",
    component: InputInvoice,
    layout: "/admin",
  },
  {
    path: "/offers",
    name: "Ponude",
    icon: "business_briefcase-24",
    component: Offer,
    layout: "/admin",
  },
];
export default dashRoutes;
