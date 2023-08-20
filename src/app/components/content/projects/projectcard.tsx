import React from "react";

const projectCard = () => {
  return (
    <div>
      <article className="max-w-md max-h-56 relative rounded-md border m-5 shadow transition hover:shadow-lg">
       {/* <Image></Image> */}
        <div className="relative pt-32 sm:pt-48 lg:pt-64">
          <div className="p-4 sm:p-6">
            <time className="block text-xs text-white/90">
              10th Oct 2022
            </time>

            <a href="#">
              <h3 className="mt-0.5 text-lg text-white">
                How to position your furniture for positivity
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae dolores, possimus pariatur animi temporibus nesciunt
              praesentium dolore sed nulla ipsum eveniet corporis quidem,
              mollitia itaque minus soluta, voluptates neque explicabo tempora
              nisi culpa eius atque dignissimos. Molestias explicabo corporis
              voluptatem?
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default projectCard;
