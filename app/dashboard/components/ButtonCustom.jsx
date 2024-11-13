import React from "react";
import clsx from "clsx";
import Marker from "./Marker.jsx";

/**
 *
 * @param icon image the button contains
 * @param children
 * @param href  in future we are making the button super reusable
 * @param containerClassName
 * @param onClick
 * @param markerFill
 * @returns {Element}
 * @constructor
 */
const ButtonCustom = ({
  icon,
  children,
  href,
  containerClassName,
  onClick, // Fixed typo
  markerFill,
}) => {
  // Define the inner content of the button
  const Inner = () => (
    <>
      <span className="relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden">
        <span className="absolute -left-[1px]">
          <Marker markerFill={markerFill} />
        </span>
        {icon && (
          <img
            src={icon}
            alt={icon ? `${icon} icon` : "button icon"} // Improved alt text
            className="size-10 mr-5 object-contain z-10"
          />
        )}
        <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
          {children}
        </span>
      </span>
      <span className="glow-before" />
    </>
  );

  return href ? (
    <a
      className={clsx(
        "relative p-0.5 g5 rounded-2xl shadow-500 group",
        containerClassName,
      )}
      href={href}
    >
      <Inner />
    </a>
  ) : (
    <button
      className={clsx(
        "relative p-0.5 g5 rounded-2xl shadow-500 group",
        containerClassName, // Added className here as well
      )}
      onClick={onClick} // Added onClick for button
    >
      <Inner />
    </button>
  );
};

export default ButtonCustom;
