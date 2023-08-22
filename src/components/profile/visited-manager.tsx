"use client";

import { useEffect } from "react";
import { useVisited } from "@/components/providers/visited-provider";

export const VisitedManager = ({
  iracingId,
  displayName,
}: {
  iracingId: string;
  displayName?: string;
}) => {
  const { addVisited } = useVisited();

  useEffect(() => {
    addVisited({ iracingId, name: displayName ?? "" });
    // Reason: Infinite loop when adding addVisited to dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iracingId, displayName]);

  return null;
};
