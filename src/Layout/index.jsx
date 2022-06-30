import { Show } from "solid-js";
import { Modal, searchStore } from "../components/Search";
import Nav from "./Nav";

export default function Layout(props) {
  return (
    <>
      <Show when={searchStore.searchString}>
        <Modal />
      </Show>
      <div class="bg-gray-800">
        <Nav />
        <div class=" dark:text-white dark:bg-gray-800 items-center overflow-auto h-screen">
          {props.children}
        </div>
      </div>
    </>
  );
}
