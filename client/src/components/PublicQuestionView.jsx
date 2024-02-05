const PublicQuestionView = ({ question, index, answerChanged }) => {
  let selectedOptions = [];

  const onCheckboxChange = (e, option) => {
    if (e.target.checked) {
      selectedOptions.push(option.text);
    } else {
      selectedOptions = selectedOptions.filter((item) => item !== option.text);
    }
    answerChanged(selectedOptions);
  };

  return (
    <>
      <fieldset className="mb-4">
        <div>
          <legend className="text-base font-medium text-gray-900">
            {index + 1}. {question?.question}
          </legend>
          <p className="text-gray-500 text-sm">{question.description}</p>
        </div>
        <div className="mt-3">
          {question.type === "select" && (
            <div>
              <select
                name=""
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select your answer</option>
                {question?.data?.options?.map((item) => (
                  <option value={item.text} key={item.uuid}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          )}
          {question.type === "radio" && (
            <div>
              {question?.data?.options?.map((item) => (
                <div key={item.uuid} className="flex items-center">
                  <input
                    type="radio"
                    id={item.uuid}
                    name={`question ${question.id}`}
                    value={item.text}
                    onChange={(e) => answerChanged(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor={item.uuid}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {item.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "checkbox" && (
            <div>
              {question?.data?.options?.map((item, index) => (
                <div key={item.uuid} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item.uuid}
                    onChange={(e) => onCheckboxChange(e, item)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={item.uuid}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {item.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "text" && (
            <div>
              <input
                type="text"
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          )}
          {question.type === "textarea" && (
            <div>
              <textarea
                name=""
                id=""
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
          )}
        </div>
      </fieldset>
      <hr className="mb-4" />
    </>
  );
};

export default PublicQuestionView;
