import { useFirstPageRedirect } from "ignite";

export default function Custom404(props) {
  const page = useFirstPageRedirect();

  if (page) {
    return null;
  }

  return <div>Oops, looks like we can't find that page!</div>;
}
