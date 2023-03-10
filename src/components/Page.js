import { useEffect } from "react";
import Container from "./Container";

function Page({ title, children, wide }) {
  useEffect(() => {
    document.title = `${title} | AlphaBlog`;
    window.scrollTo(0, 0);
  }, [title]);
  return <Container wide={wide}>{children}</Container>;
}

export default Page;
