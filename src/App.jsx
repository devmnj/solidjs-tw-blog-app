import { Route, Routes, useParams } from "solid-app-router";
import Home from "./Pages/Home";
import SinglePost from "./Pages/post/[id]";
import TagedPosts from "./Pages/tag/[tag]";
import { createResource, Show } from "solid-js";
import { client } from "./Utils/fetch";
import Tags from "./Pages/tag";
import Layout from "./Layout";
import PageNotFound from "./Layout/PageNotFound";

function getTags({ params, location, navigate, data }) {
  const [tags] = createResource(() =>
    client
      .query(
        `
  query {
    posts {
      tag   
    }
  }
  `
      )
      .toPromise()
      .then((data) => {
        // console.log(data.data.posts);
        return data.data.posts && data.data.posts;
      })
  );
  return tags;
}

function getTagPosts({ params, location, navigate, data }) {
  const [posts] = createResource(() =>
    client
      .query(
        `
query {
  posts (where: {tag:{eq:"${params.tag}"}}){
    title
    id     
    excerpt
    featured_image   
  }
}
`
      )
      .toPromise()
      .then((data) => {
        console.log(data.data.posts);
        return data.data.posts && data.data.posts;
      })
  );
  return posts;
}

function App() {
  return (
    <div>       
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/post" element={Home} />
        <Route path="/tag" element={<Tags />} data={getTags} />
        <Route path="/tag/:tag" element={<TagedPosts />} data={getTagPosts} />
        <Route
          path="/posts/:id"
          element={() => {
            const route = useParams();
            return <SinglePost id={route.id} />;
          }}
        />
        <Route
          path="/about"
          element={() => (
            <Layout>
              <div>This is a about page</div>
            </Layout>
          )}
        />
        <Route path="*" element={() => <PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
