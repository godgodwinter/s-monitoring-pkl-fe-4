<script setup>
import ButtonTwo from "../../components/atoms/ButtonTwo.vue";
</script>
<template>
  <div
    class="flex justify-center flex-col tracking-tight space-y-1 py-20 lg:py-14 container max-w-4xl mx-auto"
  >
    <div
      class="font-extrabold text-[40px] lg:text-[120px] text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-slate-600 text-center"
    >
      SISTEM PKL
    </div>
    <div
      class="font-extrabold text-[40px] lg:text-[130px] leading-7 text-sky-800 text-center"
    >
      PENGAWAS
    </div>
    <div
      class="font-extrabold text-[40px] lg:text-[120px] text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-slate-900 lg:indent-16 text-center"
    >
      LAPANGAN
    </div>

    <div class="flex justify-center gap-4 flex-wrap">
      <ButtonTwo title="Masuk Sebagai Pengawas Lapangan"></ButtonTwo>
    </div>
  </div>

  <div class="container max-w-8xl mx-auto">
    <!-- Start Second Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 px-4 xl:p-0 gap-4 xl:gap-6 5 my-14">
      <div class="bg-transparent p-6 rounded-xl border border-transparent pl-20 pt-10">
        <h1
          data-aos="zoom-in"
          data-aos-duration="2000"
          class="font-bold text-gray-700 text-xl sm:text-2xl md:text-2xl leading-tight mb-6"
        >
          A thoughtful way to pay
        </h1>
        <p
          data-aos="zoom-in"
          data-aos-duration="2000"
          class="text-gray-600 font-light mt-8 text-md"
        >
          Simpler App remembers your important details, so you can fill carts, not forms.
          And everything is encrypted so you can speed safely through checkout.
        </p>

        <p
          data-aos="zoom-in"
          data-aos-duration="2000"
          class="text-gray-600 font-light mt-8 text-md"
        >
          Now, you can offset the carbon emissions produced by your deliveries—for free.
          All you have to do is check out with Shop Pay, one of the first carbon-neutral
          way to pay.
        </p>
        <p
          data-aos="zoom-in"
          data-aos-duration="2000"
          class="text-gray-600 font-medium text-sm mt-4 mb-10"
        >
          Just One Way!.
        </p>

        <a
          href="https://github.com/godgodwinter"
          target="_blank"
          data-aos="fade-right"
          data-aos-duration="1000"
          class="transition hover:duration-100 transition-all border-double border-4 hover:border-white border-sky-600 inline-flex items-center h-16 px-8 text-sky-100 transition-colors duration-150 bg-sky-600 rounded-lg focus:shadow-outline hover:bg-sky-800"
        >
          <span class="text-white">More </span>
          <svg
            class="animate-wiggle w-10 h-10 ml-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.527 1.5 5.973-6-5.973-6-1.527 1.5 4.5 4.5z"
            />
          </svg>
        </a>
      </div>

      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        class="bg-transparent p-6 rounded-xl border border-transparent flex justify-center"
      >
        <img
          data-aos="flip-left"
          data-aos-duration="2000"
          src="@/assets/img//other/img-landing2.svg"
          alt="icon"
          class="w-auto xl:w-2/3 object-cover"
        />
      </div>
    </div>
  </div>
  <!-- End Second Row -->
</template>
