import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useMutation from "../libs/client/useMutation";
import { cls } from "../libs/client/utils";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  const [logout, { data: logoutData, loading: logoutLoading }] =
    useMutation("/api/users/logout");

  const onClickLogout = () => {
    logout({});
  };

  useEffect(() => {
    if (logoutLoading) return;
    if (logoutData?.ok) {
      router.push("/log-in");
    }
  }, [logoutData, router]);

  return (
    <div>
      {/* navigation */}
      <div className="bg-white w-full justify-center text-lg font-medium py-4  text-gray-800 border-b top-0 flex items-center fixed inset-x-0">
        {canGoBack && (
          <button onClick={onClick} className="absolute left-5 text-2xl">
            &larr;
          </button>
        )}

        {title ? <span>{title}</span> : null}
      </div>

      <div className={cls("pt-16", hasTabBar ? "pb-[89px]" : "")}>
        {children}
      </div>

      {hasTabBar ? (
        <div className="bg-white w-full px-10 pb-5 fixed inset-x-0 bottom-0 border-t">
          <nav className=" max-w-xl text-gray-700 flex justify-between text-xs m-auto pt-5">
            {/* button */}
            <Link href="/">
              <a
                className={cls(
                  "flex flex-col items-center space-y-2",
                  router.pathname === "/"
                    ? "text-orange-500"
                    : "hover:text-gray-500 transition-colors"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </a>
            </Link>

            {/* button */}
            <Link href="/profile">
              <a
                className={cls(
                  "flex flex-col items-center space-y-2",
                  router.pathname === "/profile"
                    ? "text-orange-500"
                    : "hover:text-gray-500 transition-colors"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </a>
            </Link>

            {/* button */}
            <button onClick={onClickLogout}>
              <a className={cls("flex flex-col items-center space-y-2")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <span>Logout</span>
              </a>
            </button>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}