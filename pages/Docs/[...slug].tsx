import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Selection from "#/ui/display/selection/Selection";
import Article from "#/ui/display/article/Article";
import NProgress from "nprogress";

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/article/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [router]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16">
        <h1 className="rounded-xl bg-primary-200/20 p-4 text-9xl font-black text-primary-500">
          404
        </h1>
        <div className="text-center text-xl text-slate-900 dark:text-white">
          <p>
            Looks like the documentation for{" "}
            <span className="font-bold">{router.query.slug}</span> is nowhere to
            be found!
          </p>
          <p>Try looking for something else.</p>
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <>
      {!isLoading &&
        (Array.isArray(data) ? (
          <Selection data={data} />
        ) : (
          <Article data={data} />
        ))}
    </>
  );
}

export default Doc;
