import { CircleCheckIcon, FileTextIcon, PencilIcon } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CircleCheckIcon />,
  IN_PROGRESS: <PencilIcon />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};
