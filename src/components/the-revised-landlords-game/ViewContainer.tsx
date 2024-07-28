import { component$, Slot } from "@builder.io/qwik";
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
          <div class="basis-1/2 text-center lg:text-left pb-10 md:pb-16 mx-auto">
            <Slot name="left-side" />
          </div>
          <div class="basis-1/2">
            <div style={{height: 616}}>
                <Slot name="righ-side" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
