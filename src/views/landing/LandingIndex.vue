<script setup>
import ButtonOne from "@/components/atoms/ButtonOne.vue";
import ButtonTwo from "@/components/atoms/ButtonTwo.vue";
</script>
<template>
  <div
    class="flex justify-center flex-col tracking-tight space-y-1 py-20 lg:py-14 container max-w-4xl mx-auto"
  >
    <div
      class="font-extrabold text-[40px] lg:text-[160px] text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-slate-600 text-center"
    >
      SISTEM
    </div>
    <div
      class="font-extrabold text-[40px] lg:text-[130px] leading-7 text-sky-800 text-center"
    >
      MONITORING
    </div>
    <div
      class="font-extrabold text-[40px] lg:text-[160px] text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-slate-900 lg:indent-16 text-center"
    >
      PKL .
    </div>

    <div class="flex justify-center gap-4 flex-wrap">
      <ButtonOne title="Persyaratan Pengajuan PKL"></ButtonOne>

      <ButtonOne title="Format Pengajuan PKL"></ButtonOne>
      <ButtonTwo title="More"></ButtonTwo>
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

        <ButtonTwo title="More"></ButtonTwo>
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
