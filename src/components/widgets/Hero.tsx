import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import bannerSrc from "~/assets/images/banner.png"

export default component$(() => {
  return (
    <section class="relative md:-mt-[76px] not-prose">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div class="pt-0 md:pt-[76px] pointer-events-none"></div>
        <div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:h-screen lg:gap-8">
          <div class="basis-1/2 text-center lg:text-left pb-10 md:pb-16 mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">
              The Revised Landlord's Game <br class="hidden lg:block" />{" "}
              <span class="hidden lg:inline">DebConf24 BoF demo built with </span> <span class="text-[#039de1]">Qwik</span> +{" "}
              <span class="sm:whitespace-nowrap text-[#039de1]">Tailwind CSS</span> +{" "}<span class="sm:whitespace-nowrap text-[#039de1]">SocketIO</span> +{" "}<span class="sm:whitespace-nowrap text-[#039de1]">Redis</span>
            </h1>
            <div class="max-w-2xl mx-auto lg:max-w-none">
              <p class="text-xl text-muted mb-6 dark:text-slate-300">
                <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  The Revised Landlord's Game
                </span>{" "}
                is the reimplementation of the project which began as my research to port
                <em>{"<Two Worlds: Sharing vs Monopoly>"}</em> ㅡ a game derived from <em>{"<The Landlord's Game>"} (Elizabeth Magie, 1904)</em> ㅡ
                to the web using React and Next.js for its frontend, for Korea University Capstone Design Contest last year.
                I got lots of support from <em>Jubilee & Land Justice Association</em>, the author of the game I ported during the research.{" "}
                <span class="inline md:hidden">...</span>
                <span class="hidden md:inline">
                  I felt a little bit bad that the React-based frontend and SocketIO based communication between the frontend and
                  the backend were quite prone to glitches in some race conditions, some of which already happened in the contest.
                  Furthermore, the project itself had some limits that obstruct it to be further investigated: It was too tightly
                  coupled to the React and Node.js ecosystem, it was not easy either to maintain, nor to modify, and it could be
                  played only online. Then, I recognized the need to totally reimplement the whole work from scratch.
                </span>
              </p>

              <div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
                <div class="flex w-full sm:w-auto">
                  <a
                    class="btn btn-primary sm:mb-0 w-full"
                    href="https://debconf24-bof.newsniper.org/start"
                    rel="noopener">Start a new game</a>
                </div>
                <div class="flex w-full sm:w-auto">
                  <button class="btn w-full bg-gray-50 dark:bg-transparent">Learn more (WIP)</button>
                </div>
              </div>
            </div>
          </div>
          <div class="basis-1/2">
            <Image
              src={bannerSrc}
              layout="constrained"
              width={473.92}
              height={616}
              alt="Qwind Hero Image (Cool dog)"
              class="mx-auto lg:mr-0 w-full drop-shadow-2xl rounded-md"
              priority={true}
              breakpoints={[320, 480, 640, 768, 1024]}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
