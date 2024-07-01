import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";

const Custom404 = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-40">
        <Image src="/assets/imgs/404.png" alt="404" width={600} height={700} />
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          PAGE NOT FOUND
        </h2>
        <p className="text-center text-sm mb-4">
          The page you&apos; re looking for could not be found.
        </p>
        <Link
          href={"/"}
          className="bg-primary-main  hover:bg-blue-900 rounded-md transition-colors text-white px-4 py-2 mt-2"
        >
          Go Home
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default Custom404;
