import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-base-300 border-base-content/10">
      <div className="max-w-6xl p-4 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-primary">
            Thinkboard
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="w-5 h-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
