import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface WriteForm {
  content: string;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<WriteForm>();

  const [post, { loading, data }] = useMutation("/api/posts");

  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    console.log("rec", data);
    if (data && data.ok) {
      router.push(`/tweet/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="트윗하기" canGoBack >
      <form className="px-4 py-1" onSubmit={handleSubmit(onValid)}>
        <TextArea
          required
          placeholder="What's happening?"
          register={register("content", { required: true, minLength: 1 })}
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
