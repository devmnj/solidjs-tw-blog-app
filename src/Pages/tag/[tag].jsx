import Layout from "../../Layout"
import { PostCard } from "../../components/PostGrid";
import { GridSkelton } from "../../components/Loading";
import { useRouteData } from 'solid-app-router';
export default function TagedPosts(props) {
 
    const tagedPosts=useRouteData();
    
    return(<>
    <Layout>         
    <section className=" dark:bg-gray-800 dark:text-gray-100">
        {}
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          
         
          <Show when={tagedPosts()}  fallback={()=><GridSkelton/>}>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> 
            <For each={tagedPosts()}>{(post) => <PostCard post={post} />}</For>
         </div>  </Show>
         
          <div className="flex justify-center">
            {/* <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
            >
              Load more posts...
            </button> */}
          </div>
        </div>
      </section>        
      </Layout>{" "}
    </>)
}