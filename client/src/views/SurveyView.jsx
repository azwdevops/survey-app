import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "@/components/core/TButton";
import axiosClient from "@/shared/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from "@/components/SurveyQuestions";
import { useStateContext } from "@/contexts/ContextProvider";

const SurveyView = () => {
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const { id } = useParams();
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/survey/${id}`).then(({ data }) => {
        setSurvey(data.data);
        setLoading(false);
      });
    }
  }, [id]);

  const onImageChoose = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({ ...survey, image: file, image_url: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleCheckboxChange = (e) => {
    setSurvey({ ...survey, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setSurvey({ ...survey, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...survey,
    };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      res = axiosClient.post("/survey", payload);
    }

    await res
      .then((res) => {
        navigate("/surveys");
        showToast(
          id ? "Survey updated successfully" : "Survey created successfully"
        );
      })
      .catch((err) => {
        if (err && err.response) {
          setErrors(err.response.data.message);
        }
      });
  };

  const onQuestionsUpdate = (questions) => {
    setSurvey({ ...survey, questions });
  };

  const onDelete = async () => {};

  return (
    <PageComponent
      title={id ? "Update Survey" : "Create new survey"}
      buttons={
        <div className="flex gap-4">
          <TButton color="green" href={`/survey/public/${survey.slug}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Public Link
          </TButton>
          <TButton color="red" onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" /> Delete
          </TButton>
        </div>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <form method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {errors?.length > 0 && (
                <div className="bg-red-500 text-white p-3">{errors}</div>
              )}
              {/* Image */}
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt=""
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!survey.image_url && (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus-ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onImageChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Image */}

              {/* Title */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Survey Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={handleChange}
                  placeholder="Survey title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Title */}

              {/* description */}
              <div className="cols-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survey.description}
                  onChange={handleChange}
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/* description */}

              {/* expire date */}

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="expire_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={survey.expire_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* expire date */}

              {/* active */}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={survey.status}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make publicly available
                  </p>
                </div>
              </div>
              {/* active */}
              <SurveyQuestions
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
};

export default SurveyView;
