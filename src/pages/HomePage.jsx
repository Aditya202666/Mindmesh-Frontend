import { Link } from "react-router-dom";

export default function HomePage() {
  // const session  = await auth()
  // console.log(session, "session")
  return (
    <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center flex-col">
      <div>
        <img src={"/banner.svg"} width={600} height={600} alt={"banner"} />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-b from-amber-500 to-orange-700 bg-clip-text text-transparent">
          Mindmesh
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mt-2 ">Manage your tasks, together.</p>
        <p className="text-gray-500 text-xs md:text-sm lg:text-md leading-snug">A simple way to collaborate on projects with your team. Create tasks, assign them to team members, and track their progress.</p>

        <Link to={'/register'}>
        <button 
        className="btn btn-sm mt-4 bg-amber-300 hover:bg-amber-400 rounded-lg shadow border-base-content/50 text-black"
        >Get Started</button>
        </Link>
      </div>
    </div>
  );
}
