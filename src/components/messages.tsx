"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { popCookieByKey } from "@/actions/cookies";

const Messages = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showMessages = async () => {
      const message = await popCookieByKey("toast");

      if (message) {
        toast.success(message);
      }
    };

    showMessages();
  }, [pathname]);

  return null;
};

export { Messages };
