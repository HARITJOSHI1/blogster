import { useState } from "react";
import { api as trpc } from "~/utils/api";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = trpc.blog.post.useMutation({
    onSuccess() {
      setLoading(false);
    },

    onError() {
      setTitle("");
      setBody("");
      setLoading(false);
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleBlogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutate({
      title,
      content: body,
    });

    return false;
  };

  return (
    <div
      className="flex justify-center"
      style={{
        position: "absolute",
        top: "25%",
        left: "40%",
        transform: "translate(-50px, -50px)",
        width: "40%",
      }}
    >
      <div className="mx-auto w-full">
        <h1 className="mb-4 text-center text-5xl font-bold text-slate-900">
          Create Your Blog
        </h1>
        <form onSubmit={handleBlogSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-md border-2 border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="mb-2 block font-medium text-gray-700"
            >
              Body
            </label>
            <textarea
              id="body"
              className="block w-full rounded-md border-2 border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              value={body}
              rows={10}
              onChange={handleBodyChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-40 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? <span>Hang Tight...</span> : <span>Submit</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
