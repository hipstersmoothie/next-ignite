import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";

export default () => ({ children: content }) => (
  <>
    <NavBar />
    {content}
  </>
);
