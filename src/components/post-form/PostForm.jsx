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
        status: post?.status || true,
      },
    });
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  console.log("Post Form", post);

  const onSubmitFrom = async (data) => {
    console.log("Form Data", data);
    if (post) {
      console.log(data);

      await blogService.deleteImage(post["feature-image"]);
      const dbPost = await blogService.updateBlog(user.$id, {
        ...data,
      });
      if (dbPost) {
        navigate(`/blog/${dbPost.$id}`);
      }
    } else {
      const file = await blogService.uploadImage(data.image[0]);
      if (file) {
        console.log("File uploaded successfully", file);
        const fileId = file.$id;
        data.image = fileId;
        const dbBlog = await blogService.createBlog({
          ...data,
          userId: user.$id,
        });
        if (dbBlog) {
          navigate(`/post/${dbBlog.$id}`);
        }
      } else {
        console.error("Failed to upload image");
      }
    }
  };

  const slugTransfrom = (value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s/g, "-");

    console.log(value);
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
          readOnly={true}
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
