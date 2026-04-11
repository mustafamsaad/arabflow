import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import ROUTES from "@/constants/routes";
import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestion } from "@/lib/actions/question.action";

const EditQuestion = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  const { success, data: question } = await getQuestion({ questionId: id });
  if (!success || !question) return notFound();

  if (question.author.toString() !== session.user?.id) {
    redirect(ROUTES.QUESTION(id));
  }
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <QuestionForm initialData={question} isEdit={true} />
      </div>
    </>
  );
};

export default EditQuestion;
