"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { createPopper, Placement } from "@popperjs/core";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: Placement;
}

export function Tooltip({
  children,
  content,
  placement = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const referenceRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<ReturnType<typeof createPopper> | null>(null);

  // portal container
  const portalContainer = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    portalContainer.current = el;
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  // create/destroy popper when tooltip mounts/unmounts or placement changes
  useEffect(() => {
    if (visible && referenceRef.current && popperRef.current) {
      popperInstance.current = createPopper(
        referenceRef.current,
        popperRef.current,
        {
          placement,
          modifiers: [
            { name: "offset", options: { offset: [0, 8] } },
            { name: "preventOverflow", options: { padding: 8 } },
          ],
        }
      );
    }
    return () => {
      popperInstance.current?.destroy();
      popperInstance.current = null;
    };
  }, [visible, placement]);

  // force an update whenever visible flips
  useEffect(() => {
    if (visible) popperInstance.current?.update();
  }, [visible]);

  const tooltip =
    visible && portalContainer.current
      ? createPortal(
          <div
            ref={popperRef}
            className="bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-lg z-50"
            data-popper-placement={placement}
          >
            {content}
          </div>,
          portalContainer.current
        )
      : null;

  return (
    <>
      <div
        ref={referenceRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {tooltip}
    </>
  );
}
