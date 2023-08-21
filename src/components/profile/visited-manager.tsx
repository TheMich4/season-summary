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
  }, [iracingId, displayName, addVisited]);

  return null;
};
