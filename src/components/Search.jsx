import { Link } from "solid-app-router";
import {
  createSignal,
  Show,
  createResource,
  For,
  createEffect,
} from "solid-js";
import { createMutable } from "solid-js/store";
import { client } from "../Utils/fetch";

export const searchStore = createMutable({ searchString: "" });

export default function Search() {
  const [state, setState] = createSignal();
  const handleChange = () => {
    setState(true);
    console.log(state());
  };

  return (
    <>
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          class="w-4 h-4 text-gray-600 dark:text-gray-300"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>

      <input
        onInput={(e) => searchStore.searchString = e.currentTarget.value}
        type="text"
        class="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600"
        placeholder="Search"
      />
        
       
    </>
  );
}

function SearchItem(props) {
  return (
    <>
      <Link class="" href={`${props.path}`}>
        <li class="hover:bg-blue-400 rounded-sm pt-1 pb-1 px-1 hover:text-white ">
          {props.caption || "Some Link"}
        </li>{" "}
      </Link>
    </>
  );
}

 
export function Modal() {
  let searchBox;

  setTimeout(() => searchBox.focus());
 
  const [posts, {refetch}] = createResource(() =>
    client
      .query(
        `
query  {
  posts ( where: {tag:{eq:"${searchStore.searchString}"}  } limit:10 ){
   id     
   title
  }
}
`
      )
      .toPromise()
      .then((data) => {
        console.log("Related Posts");
        console.log(data.data);
        return data.data.posts && data.data.posts;
      })
  );

  createEffect((prev) => {

    if (prev !== searchStore.searchString) {
      console.log("Search Text changed");
      refetch()
    }
  });

   const handleEvent=(event)=>{
   
      if (event.key==='Escape'){
       console.log('Esc pressed');  
       searchStore.searchString="";
      }
   }
  return (
    <>
      <div
        class="fixed   inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>
      
      {/* <!--modal content--> */}
      <div class="absolute  top-20 left-3 mx-auto p-5   w-2/6 shadow-lg rounded-md bg-gray-800 text-white overflow-auto">
        <div class="mt-1 text-left">
          <div class=" flex  bg-gray-700 px-1 pt-1 pb-1 w-full   rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mt-1 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={searchBox}
              onKeyDown={handleEvent}              
              value={searchStore.searchString}
              onInput={(e) => searchStore.searchString= e.currentTarget.value}
              class="dark:focus:border-gray-300 focus:outline-none focus:border-gray-600 my-1 mx-1 bg-gray-700 w-full"
              type="text"
              placeholder="Search Posts"
            />
          </div>
          <div>
            <ul class="my-2">
              {JSON.stringify(posts)}
              <Show when={posts()?.length>0}>
                <For each={posts()}>{(post) => <SearchItem path={`/posts/${post.id}`} caption={post.title} />}</For>
                <p class="bg-gray-800 text-gray-500">I found the above list for you !</p>
              </Show>    
             
            </ul>
          </div> 
        </div>
      </div>
    </>
  );
}
