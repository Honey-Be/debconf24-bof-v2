import { component$, JSXOutput } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import IconInstagram from "~/components/icons/IconInstagram"
import IconYoutube from "../icons/IconYoutube";
import IconGithub from "~/components/icons/IconGithub"
import IconNEWSNIPER from "../icons/IconNEWSNIPER";

export default component$(() => {

  const social: {label: string, icon: () => JSXOutput, href: string}[] = [
    { label: "Instagram", icon: IconInstagram, href: "https://www.instagram.com/newsniper_ybi" },
    { label: "Github", icon: IconGithub, href: "https://github.com/newsniper-org" },
    { label: "NEWSNIPER", icon: IconNEWSNIPER, href: "https://newsniper.org" }
  ];

  return (
    <footer class="border-t border-gray-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="md:flex md:items-center md:justify-between py-6 md:py-8">
          <ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0">
            {social.map(({ label, href, icon: Icon }, index) => (
              <li key={index}>
                <Link
                  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label={label}
                  title={label}
                  href={href}
                >
                  {typeof Icon !== "undefined" && <Icon />}
                </Link>
              </li>
            ))}
          </ul>

          <div class="text-sm text-gray-700 mr-4 dark:text-slate-400">
            <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
            Made by{" "}
            <a class="text-secondary-800 underline dark:text-gray-200" href="https://onwidget.com/">
              {" "}
              onWidget
            </a>{" "}
            · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
});
