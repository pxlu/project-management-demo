import Link from "next/link";

const WelcomeSplash = () => {
  return (
    <div className="justify-center items-center text-center flex flex-col h-screen">
      <h1 className="py-10 text-4xl">
        Welcome! Please click the button below to view your projects.
      </h1>
      <button className="rounded bg-blue-300 p-4">
        <Link href="/projects">View My Projects</Link>
      </button>
    </div>
  );
};

export default WelcomeSplash;
