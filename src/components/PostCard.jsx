import { Link } from "react-router";
import blogService from "../appwrite/blog.service";

const PostCard = ({ $id, title, imageId }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img src={blogService.getFilePreview(imageId)} alt="" />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
