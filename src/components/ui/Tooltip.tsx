import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "ponyo-ui";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;
      const gap = 8; // Space between trigger and tooltip

      switch (position) {
        case "top":
          top = rect.top - gap;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - gap;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + gap;
          break;
      }
      setCoords({ top, left });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Update position on scroll or resize while visible
  useEffect(() => {
    if (isVisible) {
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible]);

  // Portal-based transform styles
  const transforms = {
    top: "-translate-x-1/2 -translate-y-100%",
    bottom: "-translate-x-1/2",
    left: "-translate-x-100% -translate-y-1/2",
    right: "-translate-y-1/2",
  };

  const arrowTransforms = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2",
    left: "right-[-4px] top-1/2 -translate-y-1/2",
    right: "left-[-4px] top-1/2 -translate-y-1/2",
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={cn("relative w-fit", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            className={cn(
              "fixed z-9999 pointer-events-none",
              "bg-gray-800 text-white text-xs font-medium rounded-md px-2.5 py-1.5",
              "whitespace-nowrap shadow-xl",
              "transition-opacity duration-200 ease-in-out",
              isVisible ? "opacity-100" : "opacity-0",
              transforms[position]
            )}
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-800 rotate-45",
                arrowTransforms[position]
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
};

export { Tooltip };
