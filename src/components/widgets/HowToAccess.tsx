import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

const coverImage =
  "https://i.imgur.com/rOezOHI.png";

export default component$(() => {
  return (
    <section class="relative md:-mt-[76px] not-prose">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div class="pt-0 md:pt-[76px] pointer-events-none"></div>
        <div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:h-screen lg:gap-8">
          <div class="basis-1/2 text-center lg:text-center pb-10 md:pb-16 mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">
              <span class="text-[#039de1]">How to participate</span>
            </h1>
            <div class="max-w-3xl mx-auto lg:max-w-none">
              <p class="text-xl text-muted mb-6 dark:text-slate-300">
                <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  To join a game session,
                </span>{" "}login first, then go to https://debconf24-bof.newsniper.org/game/{"<game session id>"}/play
              </p>
              <p class="text-xl text-muted mb-6 dark:text-slate-300">
                <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  To watch a game,
                </span>{" "}go to https://debconf24-bof.newsniper.org/game/{"<game session id>"}/watch
              </p>
              <p class="text-xl text-muted mb-6 dark:text-slate-300">
                <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  You can embed the game board
                </span>{" "}with an iframe with{" "}<span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  src="https://debconf24-bof.newsniper.org/embed/{"<game session id>"}/board"
                </span>
              </p>
              <p class="text-xl text-muted mb-6 dark:text-slate-300">
                <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  You can embed the game control panel
                </span>{" "}with an iframe with{" "}<span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                  src="https://debconf24-bof.newsniper.org/embed/{"<game session id>"}/control"
                </span>
              </p>
            </div>
          </div>
          <div class="basis-1/2">
            <Image
              src={coverImage}
              layout="constrained"
              width={493}
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
