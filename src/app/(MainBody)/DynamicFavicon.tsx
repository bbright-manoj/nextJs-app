"use client";

import { useEffect } from "react";
import { API } from "@/app/services/api.service";

const DynamicFavicon = () => {
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await API.getAppLogo();
        const logo = res?.appLogo;

        if (logo) {
          // Safely remove existing favicon links
          const existingIcons = document.querySelectorAll("link[rel*='icon']");
          existingIcons.forEach((el) => {
            if (el && el.parentNode && document.contains(el)) {
              el.parentNode.removeChild(el);
            }
          });

          // Add a single 32x32 favicon
          const link: HTMLLinkElement = document.createElement("link");
          link.type = "image/png";
          link.rel = "icon";
          link.href = logo;
          link.sizes = "32x32";
          document.head.appendChild(link);
        } else {
          console.warn("Logo not found in response", res);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, []);

  return <></>;
};

export default DynamicFavicon;
