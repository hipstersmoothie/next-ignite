import { Sidebar } from "../components/sidebar";

export default ({ children: content }) => (
  <div className="flex">
    <Sidebar />

    <div className="flex-1">
      {content}
    </div>
  </div>
);
