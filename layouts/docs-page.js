import SidebarLayout from "../components/with-sidebar";

export default frontMatter => ({ children: content }) => (
  <SidebarLayout>
    <h1>{frontMatter.title}</h1>
    {content}
  </SidebarLayout>
);
