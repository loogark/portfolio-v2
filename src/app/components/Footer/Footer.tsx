"use client";

import { acknowledgmentLinks } from "./data";
import { FaCalendarAlt, FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "../../internationalization/useTranslation";
import { Tooltip } from "../Misc/Tooltip";
import { useSelectedLanguage } from "../../context";

export const Footer = () => {
  const [translate] = useTranslation();
  const { setSelectedLang } = useSelectedLanguage();

  return (
    <footer className="w-full bg-priamry border-t border-[#CCF381] py-4 text-[#CCF381]">
      <div className="w-[90%] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-left">
          <p className="flex items-center gap-1">
            {translate("© 2024 Made with 💖 by", "footerCreditPrefix")}{" "}
            <a
              className="underline hover:no-underline"
              href="https://www.linkedin.com/in/ragool-krishnan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ragool
            </a>
            {translate(".", "footerCreditSuffix")}
          </p>

          <p>
            {translate(
              "Thank you so much for all the tutorials and inspiration for this.",
              "footerThanks"
            )}
          </p>
          <div className="flex flex-wrap items-center space-x-2">
            <span>{translate("Inspirations:", "footerInspirations")}</span>
            {acknowledgmentLinks.map((link, i) => (
              <a
                href={link.href}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCF381] text-base hover:underline"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex gap-4">
            <Tooltip
              content={`${translate("Book a Meeting", "bookAMeeting")}`}
              placement="top"
            >
              <a
                href="https://calendly.com/ragoolkrishnan/15min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate("Meeting", "ariaMeeting")}
              >
                <FaCalendarAlt className="text-lg hover:text-white" />
              </a>
            </Tooltip>
            <Tooltip content="C.V" placement="top">
              <a
                href="https://read.cv/ool"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate("Resume", "ariaResume")}
              >
                <FaFileAlt className="text-lg hover:text-white" />
              </a>
            </Tooltip>
            <Tooltip content="Github" placement="top">
              <a
                href="https://github.com/loogark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate("GitHub", "ariaGitHub")}
              >
                <FaGithub className="text-lg hover:text-white" />
              </a>
            </Tooltip>
            <Tooltip content="Linkedin" placement="top">
              <a
                href="https://www.linkedin.com/in/ragool-krishnan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate("LinkedIn", "ariaLinkedIn")}
              >
                <FaLinkedin className="text-lg hover:text-white" />
              </a>
            </Tooltip>
          </div>

          <div className="flex gap-3">
            <button
              className="uppercase hover:underline cursor-pointer"
              onClick={() => setSelectedLang("en")}
            >
              EN
            </button>
            <button
              className="uppercase hover:underline cursor-pointer"
              onClick={() => setSelectedLang("fr")}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
