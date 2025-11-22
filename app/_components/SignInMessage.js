import Link from "next/link";

function SignInMessage({ msg }) {
  return (
    <div className="flex justify-center items-center gap-y-2">
      <h1>
        You need to signIn again to do this operation. Your session has been
        timed out.
      </h1>
      <Link href={"/login"}>Go to join</Link>
    </div>
  );
}

export default SignInMessage;
