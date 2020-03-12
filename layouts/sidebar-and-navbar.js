import { Sidebar } from "../components/sidebar";
import makeNavBarLayout from "./navbar";

const NavBarLayout = makeNavBarLayout();

export default () => ({ children: content }) => (
  <NavBarLayout>
    <div className="flex">
      <Sidebar />

      <div className="flex-1">{content}</div>
    </div>
  </NavBarLayout>
);
