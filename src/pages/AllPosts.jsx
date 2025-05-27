import { Container, PostCard } from "../components";
import blogService from "../appwrite/blog.service";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .listBlogs()
      .then((posts) => {
        console.log("Fetched blogs:", posts);
        if (posts) {
          setBlogs(posts.documents);
        } else {
          console.log("No blogs found");
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="w-full text-black py-8">
      <Container>
        {blogs.map((blog) => (
          <PostCard
            key={blog.$id}
            $id={blog.$id}
            title={blog.title}
            imageId={blog["feature-image"]}
          />
        ))}
      </Container>
    </div>
  );
};

export default AllPosts;
