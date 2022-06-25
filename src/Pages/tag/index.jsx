import { useRouteData } from "solid-app-router";
import { For, Show } from "solid-js";
import HBox from "../../components/HBox";
import { GridSkelton, Skelton } from "../../components/Loading";
import Layout from "../../Layout";
{/* {JSON.stringify(tags()?.map(({p})=>p.tag))} */}
export default function Tags(props) {
  const tags = useRouteData();
  return (
    <>
    {" "}
      <Layout>
         <section className=" dark:bg-gray-800 dark:text-gray-100">          
         
          <h1 class="text-2xl text-center"> Post Tags/Categories</h1>
          <div className="  max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <div class="   m-2 grid grid-cols-3 gap-4  h-56">
              <Show when={tags()} fallback={() => <Skelton />}>
                {}
                <For each={[...new Set(tags()?.map((p) => p.tag))]}>
                  {(tag) => <HBox caption={tag} innerCaption={tag} />}
                </For> 
              </Show>
            </div> 
          </div>
        </section>
      </Layout>{" "}
    </>
  );
}
