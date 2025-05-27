import { useNavigate, useParams } from "react-router";
import blogService from "../appwrite/blog.service";
import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log("Slug", slug);
  useEffect(() => {
    const getBlog = async () => {
      const data = await blogService.getBlog(slug);
      if (data) {
        setPost(data);
      } else {
        console.error("Post not found");
        navigate("/");
      }
    }
    if (slug) {
      getBlog();
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
};

export default EditPost;
