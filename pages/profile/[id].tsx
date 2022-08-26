import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Item from "../../components/item";
import Layout from "../../components/layout";

interface UserWithPosts extends User {
  posts: Post[];
}

interface ProfileResponse {
  ok: boolean;
  user: UserWithPosts;
}

const Profile: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<ProfileResponse>(
    router.query.id ? `/api/users/profile/${router.query.id}` : null
  );
  console.log(data?.user);

  return (
    <Layout
      title={data ? `${data.user.name}님의 프로필` : "프로필"}
      hasTabBar
      canGoBack
    >
      <div className="py-10 px-4">
        {data && (
          <>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-slate-500 rounded-full" />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {data.user.name}
                </span>
                <span className="font-medium text-gray-700">
                  {data.user.email}
                </span>
              </div>
            </div>
            <div className="mt-12">
              {data.user.posts?.map((post: Post) => (
                <Item id={post.id} key={post.id} content={post.content} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
