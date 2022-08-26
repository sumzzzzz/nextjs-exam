import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import Item from "../../components/item";
import Layout from "../../components/layout";
import useUser from "../../libs/client/useUser";
import logout from "../api/users/logout";

const Profile: NextPage = () => {
  const { user, isLoading } = useUser();
  const userInfo = user?.user;
  console.log(user?.user);

  return (
    <Layout title="My Profile" hasTabBar>
      <div className="py-10 px-4">
        {!isLoading && userInfo && (
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{userInfo.name}</span>
              <span className="font-medium text-gray-900">
                {userInfo.email}
              </span>
              {/* <Link href="/profile/edit">
                <a className="text-sm text-gray-700">Edit profile &rarr;</a>
              </Link> */}
            </div>
          </div>
        )}

        <div className="mt-12 border-t">
          {user?.user.posts?.map((post: Post) => (
            <Item id={post.id} key={post.id} content={post.content} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
