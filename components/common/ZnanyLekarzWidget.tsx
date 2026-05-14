"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    ZLWidget?: {
      init?: () => void;
    };
  }
}

const widgetScriptId = "zl-widget-s";
const profileUrl = "https://www.znanylekarz.pl/sandra-anczarska/psycholog-psychoterapeuta/myslowice";

interface ZnanyLekarzWidgetProps {
  className?: string;
}

export function ZnanyLekarzWidget({ className }: ZnanyLekarzWidgetProps) {
  useEffect(() => {
    if (!document.getElementById(widgetScriptId)) {
      const script = document.createElement("script");
      script.id = widgetScriptId;
      script.src = "https://platform.docplanner.com/js/widget.js";
      script.async = true;
      document.body.appendChild(script);
      return;
    }

    window.ZLWidget?.init?.();
  }, []);

  return (
    <a
      id="zl-url"
      className={cn("zl-url", className)}
      href={profileUrl}
      rel="nofollow"
      data-zlw-doctor="sandra-anczarska"
      data-zlw-type="big_with_calendar"
      data-zlw-opinion="false"
      data-zlw-hide-branding="true"
      data-zlw-saas-only="false"
      data-zlw-a11y-title="Widget umówienia wizyty lekarskiej"
    >
      Umów wizytę
    </a>
  );
}
