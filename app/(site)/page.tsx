import AuthForm from "@/components/auth/AuthForm";
import Image from "next/image";

const Home = () => {
  return (
    <div className=" flex min-h-full flex-col justify-center py-12 sm:px-6 lg-px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/logo.png"
          alt=""
          width={50}
          height={50}
          className=" mx-auto w-auto"
        />
        <h2 className=" mt-5 text-center text-3xl font-bold tracking-tight text-gray-900">
          تسجيل الدخول في حسابك
        </h2>
      </div>
      {/* Auth form */}
      <AuthForm />
    </div>
  );
};

export default Home;
