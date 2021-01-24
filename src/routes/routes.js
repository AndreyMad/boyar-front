import HomePage from "../pages/HomePage/HomePage";
import BoyarMapPage from "../pages/YmapPage/YmapPage";
import BoyarMapExportPage from '../pages/BoyarMapExportPage/BoyarMapExportPage';

const routes= {
  HOME_PAGE: {
    path: "/",
    component: HomePage
  },
    BOYARMAP_PAGE: {
    path: "/boyarmap",
    component: BoyarMapPage
  },
  BOYARMAP_EXPORT_PAGE: {
    path: "/boyarmapexport",
    component: BoyarMapExportPage
  }
};
export default routes