import PublicQuestionView from "@/components/PublicQuestionView";
import axiosClient from "@/shared/axiosClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SurveyPublicView = () => {
  const answers = {};
  const { slug } = useParams();
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(false);
  const [surveyFinished, setSurveyFinished] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/survey/get-by-slug/${slug}`)
      .then(({ data }) => {
        setSurvey(data.data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const answerChanged = (question, value) => {
    answers[question.id] = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient
      .post(`/survey/${survey.id}/answer`, { answers })
      .then((res) => {
        setSurveyFinished(true);
      });
  };

  return (
    <div>
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <form className="container mx-auto px-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6">
            <div className="mr-4">
              <img src={survey.image_url} alt="" />
            </div>
            <div className="col-span-5">
              <h1 className="text-3xl mb-3">{survey.title}</h1>
              <p className="text-gray-500 text-sm mb-3">
                Expire Date: {survey.expire_date}
              </p>
              <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
            </div>
          </div>

          {surveyFinished && (
            <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
              Thank you for participating in the survey
            </div>
          )}

          {!surveyFinished && [
            <>
              <div>
                {survey?.questions?.map((question, index) => (
                  <PublicQuestionView
                    question={question}
                    key={question.id}
                    index={index}
                    answerChanged={(val) => answerChanged(question, val)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </>,
          ]}
        </form>
      )}
    </div>
  );
};

export default SurveyPublicView;
