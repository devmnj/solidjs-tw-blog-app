import Layout from "../Layout";
import PostGrid from "../components/PostGrid";
import { Modal, searchStore } from "../components/Search";
import { Show } from "solid-js";

export default function Home() {
  return (
    <>
      <Layout>
        <div>
          <PostGrid />
        </div>
      </Layout>
    </>
  );
}
