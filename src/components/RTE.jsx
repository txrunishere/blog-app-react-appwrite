import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

export default function RTE({ name, control, defaultValue, label, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue || "Default Content"}
            apiKey="bwuwm06acgp8xh90t68nutkk0zctzpq0iqb8rvbzjc5lgg6r"
            init={{
              height: 500,
              menubar: false,
              plugins: ["lists", "link", "code", "wordcount"],
              toolbar:
                "undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
