import { createResource, Show, For, createEffect } from "solid-js";
import { client } from "../Utils/fetch";
import { GridSkelton, Skelton } from "./Loading";
import { Modal, searchStore } from "./Search";
function Author(props) {
  return (
    <>
      <div className="flex items-center mt-8 space-x-4">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-10 h-10 rounded-full dark:bg-gray-500"
        />
        <div>
          <h3 className="text-sm font-medium">Leroy Jenkins</h3>
          <time datetime="2021-02-18" className="text-sm dark:text-gray-400">
            Feb 18th 2021
          </time>
        </div>
      </div>
    </>
  );
}
export function PostCard(props) {
  return (
    <>
      <a
        href={`/posts/${props.post.id}`}
        rel="noopener noreferrer"
        className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900"
      >
        <img
          role="presentation"
          className="object-cover w-full rounded h-44 dark:bg-gray-500"
          src={props.post.featured_image}
        />
        <div className="flex justify-between ">
          <span class="mt-3 mx-3 text-gray-600">June 4, 2020</span>
          <span class="mt-3 mx-3 text-gray-600"> {props.post.tag || 'Reactjs'}</span>
        </div>

        <div className="px-6 py-2 space-y-2 ">
          <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
            {props.post.title || "In usu laoreet repudiare legendos"}
          </h3>        
          <p class="align-baseline">{props.post.excerpt}</p>
        </div>
       
      </a>
    </>
  );
}
function Featured(props) {
  return (
    <>
      <a
        rel="noopener noreferrer"
        href={`/posts/${props.id || 1}`}
        className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
      >
        <img
          src="https://source.unsplash.com/random/480x360"
          alt=""
          className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
        />
        <div className="p-6 space-y-2 lg:col-span-5">
          <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
            {props.title || "Noster tincidunt reprimique ad pro"}
          </h3>
          <span className="text-xs dark:text-gray-400">February 19, 2021</span>
          <p>
            {props.excerpt ||
              "Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est ingraece fuisset, eos affert putent doctus id."}
          </p>
        </div>
      </a>
    </>
  );
}
export default function PostGrid() {
  const [posts3,refetch] = createResource(() =>
    client
      .query(
        `
    query {
      posts {
        createdAt
        title
        id     
        excerpt
        postAuthor
        featured_image 
        tag  
      }
    }
    `
      )
      .toPromise()
      .then((data) => {
        return data.data.posts;
      }).catch(e=>{
        console.log('Refetch may fix the error!!');
        refetch();
      })
  );

  // createEffect(( )=>{
  //   if(posts3==undefined){
  //     console.log('Need to refetch !!');
  //     refetch();
  //   }
  // })
 
  return (
    <>
      <section className=" dark:bg-gray-800 dark:text-gray-100">       
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <span class="  ">
            <Featured />
          </span>

          <Show
            when={posts3()?.length>0}
            fallback={() => (
              <div class="">
                <GridSkelton />
              </div>
            )}
          >
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {" "}
              <For each={posts3()}>{(post) => <PostCard post={post} />}</For>
            </div>{" "}
          </Show>

          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
            >
             
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
