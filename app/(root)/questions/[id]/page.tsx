const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  return <div>{id}</div>;
};
export default QuestionDetails;
