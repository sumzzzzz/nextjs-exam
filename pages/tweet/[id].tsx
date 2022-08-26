import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import useMutation from "../../libs/client/useMutation";
import { cls } from "../../libs/client/utils";
import useUser from "../../libs/client/useUser";
import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface PostWithUser extends Post {
  user: User;
  _count: {
    favList: number;
  };
}

interface ItemDetailResponse {
  ok: boolean;
  post: PostWithUser;
  isFavorited: boolean;
}

interface FavResponse {
  ok: boolean;
}

interface CountResponse {
  ok: boolean;
  isFav: boolean;
  countFav: number;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const [toggleFav, { data: favData }] = useMutation<FavResponse>(
     `/api/posts/${router.query.id}/fav` 
  );

  const {data: countFav, mutate: countFavMutate} = useSWR<CountResponse>(
    router.query.id ? `/api/posts/${router.query.id}/fav/count` : null
  );

  const [isFavorited, setFavorited] = useState(countFav?.isFav);
  const [countFavorited, setCountFavorited] = useState(countFav?.countFav);

  useEffect(() => {
    if (countFav?.ok) {
      setFavorited(countFav.isFav);
      setCountFavorited(countFav.countFav);
    }
  }, [countFav]);

  const onFavClick = () => {
    toggleFav({ data: favData }); // 비어있는 body로 post request
    if (!data) return;
    mutate({ ...data });
    if (!countFav) return;
    countFavMutate({...countFav});
  };

  return (
    <Layout title={"Tweet"} canGoBack hasTabBar>
      <div className="px-4 py-0">
        <div className="mb-8">
          {/* user */}
          <div className="flex items-center py-3 space-x-3 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-300" />

            <div className="">
              <div className="flex flex-row gap-2">
                <p className="text-sm font-medium text-gray-700">
                  {data?.post.user.name}
                </p>
                <p className="text-sm font-light text-gray-300">
                  {`${data?.post.user.email}`}
                </p>
              </div>
              <Link href={`/profile/${data?.post?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>

          {/* main */}
          <div className="mt-7">
            <p className="font-default text-base my=6 text-gray-900 pb-3">
              {data?.post.content}
            </p>

            <div className="flex items-center justify-between space-x-2 border-t">
              <button
                className={cls(
                  "p-3 flex items-center justify-center rounded-md transition-colors hover:bg-gray-200",
                  isFavorited
                    ? "text-blue-500"
                    : "hover:text-white text-gray-400"
                )}
                onClick={onFavClick}
              >
                {isFavorited ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}

                <span>{countFavorited}</span>
              </button>

              {/* <Button large text="Talk to seller" /> */}
            </div>
            {/* end - Talk to seller */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
