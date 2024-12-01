"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { popCookieByKey } from "@/actions/cookies";

const Messages = () => {
  useEffect(() => {
    const showMessages = async () => {
      const message = await popCookieByKey("toast");

      if (message) {
        toast.success(message);
      }
    };

    showMessages();
  }, []);

  return null;
};

export { Messages };
