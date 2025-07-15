import React, {useEffect, useState} from "react"
import Layout from "@theme/Layout"
import Heading from "@theme/Heading"
import Section from "../components/shared/Section"
import {Theme} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import {analyticsHandler} from "@site/src/utils"
import {CircleCheck, Minus, Plus} from "lucide-react"
import FinalCTA from "../components/home/FinalCTA"
import OpenAILogo from "@site/src/assets/logos/openai.svg"
import AnthropicLogo from "@site/src/assets/logos/anthropic.svg"
import GoogleLogo from "@site/src/assets/logos/google.svg"
import XAILogo from "@site/src/assets/logos/xai.svg"
import MetaLogo from "@site/src/assets/logos/meta.svg"
import MistralLogo from "@site/src/assets/logos/mistral.svg"
import DeepSeekLogo from "@site/src/assets/logos/deepseek.svg"
import NewLinkButton from "../components/shared/NewLinkButton"
import clsx from "clsx"
import {FAQS, tiers} from "../constants/index"
import {useLocation} from "@docusaurus/router"
import ReactGA from "react-ga4"
import SpotlightSpan from "../components/home/SpotlightCursor"

// AI Providers array for iteration
const aiProviders = [
  {name: "OpenAI", logo: OpenAILogo},
  {name: "Anthropic", logo: AnthropicLogo},
  {name: "Google", logo: GoogleLogo},
  {name: "xAI", logo: XAILogo},
  {name: "Meta", logo: MetaLogo},
  {name: "Mistral", logo: MistralLogo},
  {name: "Deepseek", logo: DeepSeekLogo},
]

const PricingPage = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Pricing Page"})
  }, [])

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Layout title="Pricing" description="Simple, transparent pricing for ForgeCode">
      <div className="px-6 md:px-20 py-12 dark:bg-black bg-tailCall-light-1200">
        <div className="flex flex-col lg:gap-0 items-start xl:items-center xl:flex-row justify-between w-full py-5 px-2 md:px-0">
          <div className="flex flex-col mt-2">
            <SpotlightSpan
              className="font-bebas !font-normal text-[45px] md:text-display-small lg:text-display-medium xl:text-display-large-semi tracking-normal"
              text="start for free."
              showHighlighted
            />
            <SpotlightSpan
              className="-mt-4 md:-mt-5 lg:-mt-2 xl:-mt-8 leading-10 md:leading-normal font-bebas !font-normal text-[45px] md:text-display-small lg:text-display-medium xl:text-display-large-semi tracking-normal"
              text="scale when you're ready."
              showHighlighted
            />
          </div>
          <span className="block mt-2 md:mt-0 max-w-[500px] xl:mt-20 font-kanit !font-normal lg:leading-8 xl:leading-[32px] text-[16px] md:text-title-small lg:text-[24px] xl:text-[26px] text-tailCall-darkMode---neutral-500 tracking-normal">
            No credit card required.No lock-in. <br />
            Just productivity from day one
          </span>
        </div>
      </div>
      <main>
        <Section className="py-16 lg:py-24 dark:bg-black bg-tailCall-light-1200">
          <div className="text-center mb-20">
            <Heading
              as="h1"
              className="text-title-large !font-normal md:text-content-regular mb-6 text-tailCall-lightMode---neutral-900 dark:text-white font-kanit"
            >
              Plans for Your Need
            </Heading>
            <p className="text-title-small-pricing text-tailCall-darkMode---neutral-600 dark:text-tailCall-darkMode---neutral-300 max-w-2xl mx-auto font-kanit">
              Select from best plan, ensuring a perfect match. Need more or less? Customize your subscription for a
              seamless fit!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={clsx(
                  "relative group flex flex-col rounded-xl p-6 bg-white dark:bg-tailCall-darkMode---neutral-900 transition-all duration-300 overflow-hidden",
                  "border-solid border-[0.732px] dark:border-[#737373]",
                  "hover:-translate-y-4 hover:shadow-2xl dark:hover:border-cyan-300",
                )}
              >
                <div className="absolute left-0 bottom-0 w-full h-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 bg-gradient-procing-cards-light dark:bg-gradient-procing-cards-dark"></div>

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex gap-2 mb-4">
                    {tier.icons?.map((src, idx) => {
                      const isFillHover = tier.name === "Free" || tier.name === "Pro"
                      return (
                        <div
                          key={idx}
                          className={clsx(
                            "relative h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
                            "border border-gray-600 dark:bg-[#1A1A1A]",
                            isFillHover
                              ? "group-hover:bg-white group-hover:dark:border-white"
                              : "group-hover:ring-2 group-hover:dark:ring-white",
                          )}
                        >
                          <img
                            src={src}
                            alt={`icon-${idx}`}
                            className="h-6 w-6 object-contain transition-all duration-300"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-content-small text-left text-tailCall-lightMode---neutral-900 dark:text-white mb-1 dark:group-hover:text-white">
                      {tier.name}
                    </h3>
                    {tier.description && (
                      <p className="text-[13px] text-left text-gray-500 dark:text-tailCall-darkMode---neutral-400 mb-6 dark:group-hover:text-white">
                        {tier.description}
                      </p>
                    )}

                    <div className="mb-6 text-center">
                      <div className="flex justify-center items-baseline gap-2">
                        <span className="text-title-text-large font-bold text-tailCall-lightMode---neutral-900 dark:text-white">
                          {tier.price}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-tailCall-darkMode---neutral-400 group-hover:dark:text-white group-hover:text-gray-500">
                          {tier.period}
                        </span>
                      </div>
                    </div>

                    <div>
                      <NewLinkButton
                        title={tier.cta}
                        href={tier.href}
                        theme={tier.popular ? Theme.Dark : Theme.Light}
                        width="full"
                        onClick={() => analyticsHandler("Pricing Page", "Click", tier.cta)}
                      />
                    </div>

                    <hr className="border-gray-300 dark:border-gray-700 mb-4" />

                    <div>
                      <p className="text-sm font-normal text-[15px] mb-3 text-tailCall-lightMode---neutral-900 dark:text-tailCall-light-800 group-hover:text-white transition-colors duration-300">
                        Features
                      </p>
                      <ul className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 items-center text-sm text-gray-700 dark:text-tailCall-darkMode---neutral-400 dark:group-hover:text-white transition-colors duration-300 font-kanit"
                          >
                            <CircleCheck
                              size={12}
                              className="dark:text-tailCall-light-800 mt-0.5 flex-shrink-0 dark:group-hover:text-white transition-colors duration-300"
                            />
                            <span className="text-[13px]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] xl:gap-32 items-start">
            <div className="items-start mt-11">
              <Heading
                as="h2"
                className="text-title-large !font-normal md:text-content-regular text-left mb-1 text-tailCall-lightMode---neutral-900 dark:text-tailCall-white"
              >
                FAQ
              </Heading>
              <div className="text-content-tiny !font-[275] md:text-content-large dark:text-tailCall-border-light-300 font-kanit mt-5">
                Select from best plan, ensuring a perfect match. Need more or less? Customize your subscription for a
                seamless fit!
              </div>
            </div>

            <div className="w-full">
              {FAQS.map((item, index) => (
                <div key={index}>
                  <div
                    className="flex w-full justify-between items-center py-12 text-left focus:outline-none bg-transparent dark:bg-black border-none cursor-pointer"
                    onClick={() => toggleIndex(index)}
                  >
                    <span
                      className={clsx(
                        "text-content-small md:text-question-title",
                        openIndex === index ? "text-[#262626] dark:text-white" : "text-[#A1A1A1]",
                        "transition-colors duration-300",
                      )}
                    >
                      {item.question}
                    </span>
                    <span className="text-tailCall-darkMode---primary-700 dark:text-white flex items-center justify-center">
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-tailCall-darkMode---neutral-600 dark:text-tailCall-light-800 py-8 font-kanit text-content-tiny md:text-[23px] leading-7 md:leading-[35px] font-[275]">
                      {item.answer}
                    </p>
                  </div>
                  <div className="bg-gradient-border h-[1px] w-full"></div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA Section */}
        </Section>
        {/* <FinalCTA showPricingButton={false} /> */}
      </main>
    </Layout>
  )
}

export default PricingPage
