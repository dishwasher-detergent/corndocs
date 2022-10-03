import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DisplayChildren from "../../components/display/Children";
import DisplayDoc from "../../components/display/Doc";

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/posts/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    }
  }, [router]);
  
  if(!data){
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="rounded-md bg-primary-300/20 p-4 text-9xl font-black text-primary-500">
          404
        </h1>
        <div className="text-center text-xl">
          <p>
            Looks like the documentation for {router.query.slug} is nowhere to be
            found!
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isLoading &&
        (data.children ? (
          <DisplayChildren data={data} />
        ) : (
          <DisplayDoc data={data} />
        ))}
    </>
  );
}

export default Doc;
