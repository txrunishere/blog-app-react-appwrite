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
    <header>
      <Container>
        <nav>
          <div>
            <Link to={"/"}>
              <Logo />
            </Link>
            <ul>
              {navLinks.map((item, index) =>
                item.active ? (
                  <li key={index}>
                    <Button handler={() => navigate(item.slug)}>
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
