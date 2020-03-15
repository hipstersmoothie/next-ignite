import { useFirstPageRedirect } from "ignite";

export default function Custom404(props) {
  const page = useFirstPageRedirect();

  console.log("404", { page });

  if (page) {
    return null;
  }

return <div>Oops, looks like we can't find that page! page: {page}</div>;
}
