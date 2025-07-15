import Layout from "@theme/Layout"
import React, {useEffect, useState} from "react"
import SpotlightSpan from "../components/home/SpotlightCursor"
import {UserIcon, IdCard, Mail, MailOpen, AlignLeft, SquarePen, BriefcaseBusiness} from "lucide-react"
import LabeledInput from "../components/shared/Input/Input"
import {FieldError, useForm} from "react-hook-form"
import {COMPANY_STRENGTH, JOB_TITLE} from "../constants"

interface FormInputs {
  first_name: string
  last_name: string
  email: string
  job_title: string
  company: string
  company_strength: string
  additional_comments: string
}

const contact = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInputs>()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const onSubmit = (data: FormInputs) => {
    console.log("Form Submitted:", data)
  }
  return (
    <Layout title="Contact" description="Contact Us">
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center bg-tailCall-darkMode---neutral-200 dark:bg-[rgba(212,212,212,0.1)] px-4 py-7 md:px-14 md:py-7 xl:px-28 xl:py-14">
            <div className="flex flex-col items-start xl:items-center xl:flex-row justify-between w-full max-w-[1440px]">
              <div className="flex flex-col">
                <SpotlightSpan
                  className="font-bebas !font-normal text-[45px] md:text-[55px] lg:text-[64px] xl:text-display-large-semi tracking-normal"
                  text="Have a questions?"
                  showHighlighted
                />
                <SpotlightSpan
                  className="-mt-8 md:-mt-10 lg:-mt-10 xl:-mt-9 font-bebas !font-normal text-[45px] md:text-[55px] lg:text-[64px] xl:text-display-large-semi tracking-normal"
                  text="Let's talk code."
                  showHighlighted
                />
              </div>
              <span className="max-w-[600px] lg:max-w-[500px] xl:max-w-[50%] font-kanit !font-medium xl:text-title-semi-large text-[16px] md:text-[20px] lg:text-[24px] text-tailCall-darkMode---neutral-500 tracking-normal">
                Whether it's support, feedback, or partnerships we're all ears (and keyboards).
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex xl:justify-between lg:items-center justify-center xl:items-center xl:flex-row w-full px-4 py-7 md:px-14 md:py-7 xl:px-28 xl:py-14">
              <div className="w-full xl:w-auto">
                <h1 className="text-tailCall-darkMode---neutral-800 dark:text-white font-kanit text-display-medium !font-normal">
                  Hi
                </h1>
                <form className="flex flex-col gap-10 mt-16" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col sm:flex-row gap-8">
                    <LabeledInput
                      label="First Name"
                      name="first_name"
                      type="text"
                      icon={<IdCard />}
                      register={register}
                      error={errors.first_name}
                      required
                    />
                    <LabeledInput
                      label="Last Name"
                      name="last_name"
                      type="text"
                      icon={<AlignLeft />}
                      register={register}
                      error={errors.last_name}
                      required
                    />
                  </div>
                  <LabeledInput
                    label="Email"
                    name="email"
                    type="email"
                    icon={<MailOpen />}
                    register={register}
                    error={errors.email}
                    required
                  />
                  <LabeledInput
                    label="Job Title"
                    name="job_title"
                    icon={<SquarePen />}
                    type="select"
                    options={JOB_TITLE}
                    register={register}
                    error={errors.job_title}
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-8">
                    <LabeledInput
                      label="Company"
                      name="company"
                      type="text"
                      icon={<BriefcaseBusiness />}
                      register={register}
                      error={errors.company}
                      required
                    />
                    <LabeledInput
                      label="Company Strength"
                      name="company_strength"
                      type="select"
                      icon={<UserIcon />}
                      options={COMPANY_STRENGTH}
                      register={register}
                      error={errors.company_strength}
                      required
                    />
                  </div>
                  <LabeledInput
                    label="Additional Comments"
                    name="additional_comments"
                    type="textarea"
                    placeholder="Describe"
                    register={register}
                    error={errors.additional_comments}
                  />
                  <div className="flex items-start">
                    <button
                      type="submit"
                      className="cursor-pointer relative flex items-center justify-center border-none bg-transparent"
                    >
                      <img
                        src="/images/home/curly-background.svg"
                        alt="curly-background"
                        height={60}
                        className="hidden dark:block"
                      />
                      <img
                        src="/images/home/curly-background-light.svg"
                        alt="curly-background"
                        height={60}
                        className="block dark:hidden"
                      />
                      <span className="text-white dark:text-black font-kanit text-title-small font-light absolute">
                        Submit
                      </span>
                    </button>
                  </div>
                </form>
              </div>
              {!isMobile ? (
                <div>
                  <img src="/images/home/contact.svg" alt="Contact Image" className="hidden dark:block" />
                  <img src="/images/home/contact-light.svg" alt="Contact Image" className="block dark:hidden" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default contact
