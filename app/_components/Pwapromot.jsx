"use client";
import React, { useState, useEffect } from "react";
import { MdInstallDesktop } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsVisible(false);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1"
        >
          <MdInstallDesktop className="text-yellow-500 hidden md:block" />
          <MdInstallMobile className="text-yellow-500 md:hidden" />
          Install App
        </button>
      )}
    </>
  );
};

export default PWAInstallPrompt;
