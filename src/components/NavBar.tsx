

import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center m-3">
      <h1 className="Honk text-4xl"><a href="/">Game of Thrones</a></h1>
      <ul className="flex gap-4">
        <li>
          <button>
            <a href="/house" target="_blank" rel="noreferrer">House</a>
          </button>
        </li>
        <li>
          <Button>
            <a href="https://github.com/vijaynaidu16" target="_blank" rel="noreferrer">
              GitHub ❤️‍🔥
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
