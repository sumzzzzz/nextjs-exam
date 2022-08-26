import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import useMutation from "../libs/client/useMutation";
import { useRouter } from "next/router";
import useUser from "../libs/client/useUser";

interface EnterForm {
  email: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

export default function Enter() {
  const router = useRouter();
  
  // const { user, isLoading } = useUser();
  // console.log(user);

  // if (user){
  //   console.log("login", user);
  //   router.push("/");
  // }

  const [enter, { loading, data }] =
    useMutation<MutationResult>("/api/users/login");

  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");

  const { register, handleSubmit } = useForm<EnterForm>();
  
  const {
    register: tokenRegister,
    handleSubmit: tokenHandleSubmit
  } = useForm<TokenForm>();

  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  const onClick = () => {
    router.push(`/create-account`);
  };

  return (
    <div className="">
      <h3 className="text-3xl font-bold text-center pt-14 pb-5 text-stone-800">
        LOGIN
      </h3>

      <div className="">
        {data?.ok ? (
          // ok를 받았을 경우
          <form
            className="flex flex-col px-4"
            onSubmit={tokenHandleSubmit(onTokenValid)}
          >
            <Input
              register={tokenRegister("token", {
                required: true,
              })}
              name="token"
              label="Confirmation Token"
              type="number"
              required
            />
            <Button text={loading ? "Loading" : "Confirm Token"} />
          </form>
        ) : (
          <form className="flex flex-col px-4" onSubmit={handleSubmit(onValid)}>
            <Input
              register={register("email", {
                required: true,
              })}
              name="email"
              label="Email address"
              type="email"
              required
            />
            <Button text={"Get login link"} />
          </form>
        )}
      </div>
      <div className="px-4">
        <Button text={"JOIN"} secondColor onClick={onClick} />
      </div>
    </div>
  );
}
