import makeSidebarAndNavBarLayout from "./sidebar-and-navbar";
import { Sidebar } from "../components/sidebar";
import { H1 } from "../components/h1";

const SidebarAndNavBarLayout = makeSidebarAndNavBarLayout();

export default frontMatter => ({ children: content }) => (
  <SidebarAndNavBarLayout>
    <H1>{frontMatter.title}</H1>
    {content}
  </SidebarAndNavBarLayout>
);
