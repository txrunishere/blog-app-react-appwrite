import { useSelector } from "react-redux";
import { Button, Container, Logo, LogoutButton } from "../";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Register",
      slug: "/register",
      active: !status,
    },
    {
      name: "Login",
      slug: "/login",
      active: !status,
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      active: status,
    },
    {
      name: "Add Blog",
      slug: "/add-blog",
      active: status,
    },
  ];

  return (
    <header className="w-full z-10 sticky top-2">
      <Container className="bg-neutral-700 rounded-xl my-2">
        <nav className="py-4 bg-transparent">
          <div className="flex justify-between px-2">
            <Link className="flex items-center" to={"/"}>
              <Logo />
            </Link>
            <ul className="flex gap-2 items-center">
              {navLinks.map((item, index) =>
                item.active ? (
                  <li key={index}>
                    <Button bgColor="bg-gray-500" className="hover:bg-gray-600" handler={() => navigate(item.slug)}>
                      {item.name}
                    </Button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          {status && <LogoutButton />}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
