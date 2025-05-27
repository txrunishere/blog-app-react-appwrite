import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../";
import blogService from "../../appwrite/blog.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        // featureImage: post?.featureImage || "",
        status: post?.status || true,
      },
    });
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  const onSubmitFrom = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await blogService.uploadImage(data.image[0])
        : null;
      if (file) {
        await blogService.deleteImage(post.featureImage);
      }
      const dbPost = await blogService.updateBlog(blog.$id, {
        ...data,
        featureImage: file ? file.$id : null,
      });
      if (dbPost) {
        navigate(`/blog/${dbPost.$id}`);
      }
    } else {
      const file = await blogService.uploadImage(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featureImage = fileId;
        const dbBlog = await blogService.createBlog({
          ...data,
          userId: user.$id,
        });
        if (dbBlog) {
          navigate(`/blog/${dbBlog.$id}`);
        }
      }
    }
  };

  const slugTransfrom = (value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  };

  useEffect(() => {
    const subsciption = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransfrom(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subsciption.unsubscribe();
    };
  }, [watch, slugTransfrom, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmitFrom)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
