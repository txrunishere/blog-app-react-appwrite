import blogService from "../appwrite/blog.service";
import { useEffect, useState } from "react";
import { Container, Button, PostCard } from "../components";
import { useNavigate } from "react-router";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    blogService.listBlogs().then(blog => {
      if (blog) {
        setBlogs(blog.documents);
      }
    })
  }, []);

  if (blogs.length === 0) {
    return (
      <div className='py-8'>
        <Container>
          <div className='text-center text-gray-500'>No posts available</div>
          <Button onClick={() => navigate('/add-post')}>Add Post</Button>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full text-black py-8'>
      <Container>
        <div className="flex flex-wrap">
          {blogs.map((blog) => (
            <div key={blog.$id}>
              <PostCard
                $id={blog.$id}
                imageId={blog["feature-image"]}
                title={blog.title}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
