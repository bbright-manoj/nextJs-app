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
          // Remove existing favicons
          const existingIcons = document.querySelectorAll("link[rel*='icon']");
          existingIcons.forEach((el) => el.parentNode?.removeChild(el));

          const sizes = ["16x16", "32x32", "48x48", "64x64"];

          sizes.forEach((size) => {
            const link: HTMLLinkElement = document.createElement("link");
            link.type = "image/png";
            link.rel = "icon";
            link.href = logo;
            link.sizes = size;
            document.head.appendChild(link);
          });

          // Optionally set default favicon for browsers that ignore sizes
          const defaultLink: HTMLLinkElement = document.createElement("link");
          defaultLink.type = "image/png";
          defaultLink.rel = "icon";
          defaultLink.href = logo;
          document.head.appendChild(defaultLink);
        } else {
          console.warn("Logo not found in response", res);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, []);

  return null;
};

export default DynamicFavicon;
