import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import InputText from "../components/input";
import useMutation from "../libs/client/useMutation";
import { useRouter } from "next/router";

interface EnterForm {
  email: string;
  name: string;
}

interface MutationResult {
  ok: boolean;
  error: string;
  loading: boolean;
}

export default function Enter() {
  const [enter, { loading, data }] =
    useMutation<MutationResult>("/api/users/create");

  const { register, handleSubmit } = useForm<EnterForm>();

  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (data?.ok) {
      router.push("/log-in");
    }
  }, [data, router]);

  const onClick = () => {
    console.log("go login");
    router.push(`/log-in`);
  };

  return (
    <div className="">
      <h3 className="text-3xl font-bold text-center pt-14 pb-5 text-stone-800">
        JOIN
      </h3>

      <div className="">
        <form className="flex flex-col px-4" onSubmit={handleSubmit(onValid)}>
          <InputText
            register={register("email", {
              required: true,
            })}
            name="email"
            label="Email address"
            type="email"
            required
            error={data?.error}
          />

          <InputText
            register={register("name", {})}
            name="name"
            label="Name"
            type="text"
            required={false}
          />
          <Button text={"JOIN"} />
        </form>
      </div>
      <div className="px-4">
        <Button text={"LOGIN"} secondColor onClick={onClick} />
      </div>
    </div>
  );
}
