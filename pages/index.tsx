import { Post } from "@prisma/client";
import useSWR from "swr";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";

interface PostWithCount extends Post {
  _count: {
    favList: number;
  }
}

interface PostsResponse {
  ok:boolean;
  posts: PostWithCount[];
}

export default function Home() {
  const {data} = useSWR<PostsResponse>("/api/posts");


  return (
    <Layout title="Home" hasTabBar>
      <div>
        {data?.posts?.map((post:PostWithCount) => (
          <Item
            id={post.id}
            key={post.id}
            content={post.content}
            hearts={post._count.favList}
            />
        ))}        

        <FloatingButton href="/tweet/write">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}
