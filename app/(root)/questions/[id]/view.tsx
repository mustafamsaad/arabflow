"use client"

import { useEffect } from "react";
import {incrementViews} from "@/lib/actions/question.action";
import { toast } from "sonner";

const View = ({questionId} : {questionId: string}) => {
  const handleIncrementViews = async () => {
    const result = await incrementViews({ questionId })

    if (result.success) {
      toast.success("Question viewed successfully")
    } else {
      toast.error("Failed to view question")
    }
  }
  useEffect(() => {
    handleIncrementViews()
  }, []);

  return null;
};
export default View;