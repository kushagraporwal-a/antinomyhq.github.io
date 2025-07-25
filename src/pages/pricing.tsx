import React, {useEffect, useState, useCallback, useMemo} from "react"
import Layout from "@theme/Layout"
import Heading from "@theme/Heading"
import Section from "../components/shared/Section"
import {Theme} from "@site/src/constants"
import {analyticsHandler} from "@site/src/utils"
import {CircleCheck, Minus, Plus} from "lucide-react"
import NewLinkButton from "../components/shared/NewLinkButton"
import clsx from "clsx"
import {FAQS, tiers} from "../constants/index"
import {useLocation} from "@docusaurus/router"
import ReactGA from "react-ga4"
import SpotlightSpan from "../components/home/components/SpotlightCursor"
import AIProviderCard from "../components/shared/AIProviderCard"

// Types
interface AIProvider {
  title: string
  darkLogoUrl: string
  lightLogoUrl: string
}

interface PricingTier {
  name: string
  price: string
  period: string
  description?: string
  cta: string
  href: string
  popular?: boolean
  features: string[]
}

interface FAQItem {
  question: string
  answer: string
}

// Constants
const AI_PROVIDERS: AIProvider[] = [
  {title: "OpenAI", darkLogoUrl: "/images/pricing/openai-dark.svg", lightLogoUrl: "/images/pricing/openai-light.svg"},
  {
    title: "Anthropic",
    darkLogoUrl: "/images/pricing/anthropic-dark.svg",
    lightLogoUrl: "/images/pricing/anthropic-light.svg",
  },
  {title: "Google", darkLogoUrl: "/images/pricing/google-dark.svg", lightLogoUrl: "/images/pricing/google-light.svg"},
  {title: "xAI", darkLogoUrl: "/images/pricing/xai-dark.svg", lightLogoUrl: "/images/pricing/xai-light.svg"},
  {title: "Meta", darkLogoUrl: "/images/pricing/meta-dark.svg", lightLogoUrl: "/images/pricing/meta-light.svg"},
  {
    title: "Mistral",
    darkLogoUrl: "/images/pricing/mistral-dark.svg",
    lightLogoUrl: "/images/pricing/mistral-light.svg",
  },
  {
    title: "Deepseek",
    darkLogoUrl: "/images/pricing/deepseek-dark.svg",
    lightLogoUrl: "/images/pricing/deepseek-light.svg",
  },
]

// Components
const HeroSection: React.FC = () => (
  <div className="max-w-[1320px] mx-auto w-full">
    <div className="py-12 dark:bg-black bg-tailCall-light-1200 border-b border-solid border-transparent border-b-[#dbdbdb] dark:border-b-[#4b4b4b]">
      <div className="flex flex-col lg:gap-0 items-start xl:items-center xl:flex-row justify-between w-full py-5 px-2">
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
        <span className="block mt-2 md:mt-0 max-w-[500px] xl:mt-20 font-kanit !font-normal lg:leading-8 xl:leading-[32px] text-[16px] md:text-title-small lg:text-[20px] xl:text-[22px] text-tailCall-darkMode---neutral-500 tracking-normal">
          No credit card required.No lock-in. <br />
          Just productivity from day one
        </span>
      </div>
    </div>
  </div>
)

const PricingHeader: React.FC = () => (
  <div className="text-center mb-14">
    <Heading
      as="h1"
      className="text-title-large !font-normal md:text-content-regular mb-2 text-tailCall-lightMode---neutral-900 dark:text-white font-kanit"
    >
      Simple Pricing
    </Heading>
    <p className="text-title-small-pricing !text-[22px] font-kanit !font-normal text-tailCall-darkMode---neutral-500 max-w-2xl mx-auto">
      Start free, upgrade when you're ready. No hidden fees.
    </p>
  </div>
)

const LimitedTimeBadge: React.FC = () => (
  <>
    <div className="absolute -right-[10px] rounded-tl-[40px] rounded-bl-[40px] p-[2px] bg-[linear-gradient(90deg,rgba(177,_192,_172,_1)_0%,_rgba(83,_90,_81,_1)_100%)] dark:bg-[linear-gradient(90deg,rgba(102,_102,_102,_1)_0%,_rgba(10,_31,_3,_1)_100%)]">
      <div className="bg-[#8AA780] dark:bg-[#41503C] px-4 rounded-tl-[40px] rounded-bl-[40px]">
        <span className="font-kanit text-white text-content-mini leading-10">Limited Time Only</span>
      </div>
    </div>
    <div className="absolute -right-[10px] top-[60px] md:top-[3.8rem] lg:top-[60px] xl:top-[3.7rem]">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M0.5 8.5L10.5 0H0.5V8.5Z" fill="#67815E" />
      </svg>
    </div>
  </>
)

const PricingCard: React.FC<{tier: PricingTier}> = ({tier}) => {
  const isMaxTier = tier.name === "Max"
  
  const handleButtonClick = useCallback(() => {
    analyticsHandler("Pricing Page", "Click", tier.cta)
  }, [tier.cta])

  return (
    <div className="bg-gradient-315-light-inactive dark:bg-gradient-315-inactive hover:bg-gradient-315-light hover:dark:bg-gradient-315 rounded-[13px] group p-[1px] relative flex flex-col transition-all duration-300 overflow-visible hover:-translate-y-4 hover:shadow-2xl">
      <div className="p-6 bg-white dark:bg-tailCall-darkMode---neutral-900 rounded-[12px] h-full">
        <div
          className={clsx(
            "absolute left-0 bottom-0 w-full h-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 bg-custom-radial-light dark:bg-custom-radial",
            {"!opacity-100": isMaxTier},
          )}
        />

        {isMaxTier && <LimitedTimeBadge />}

        <div className="relative z-10">
          <div className="flex flex-col flex-grow">
            <h3 className="text-title-semi-large font-normal text-left text-tailCall-darkMode---neutral-600 dark:text-white mb-0 dark:group-hover:text-white">
              {tier.name}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <span className="text-title-text-large font-normal text-tailCall-darkMode---neutral-600 dark:text-white">
                {tier.price}
              </span>
              <span className="text-content-tiny text-tailCall-darkMode---neutral-600 dark:text-white">
                {tier.period}
              </span>
              {isMaxTier && (
                <span className="text-content-medium leading-[14px] font-kanit font-light text-tailCall-darkMode---neutral-600 dark:text-tailCall-darkMode---neutral-400 line-through decoration-from-font">
                  $200/month
                </span>
              )}
            </div>

            {tier.description && (
              <p className="text-[13px] text-left dark:text-tailCall-darkMode---neutral-400 mb-6">
                {tier.description}
              </p>
            )}

            <NewLinkButton
              title={tier.cta}
              href={tier.href}
              theme={tier.popular ? Theme.Dark : Theme.Light}
              width="full"
              onClick={handleButtonClick}
            />

            <hr className="border-gray-300 dark:border-gray-700 mb-4" />

            <div>
              <p className="text-sm font-normal text-[15px] mb-3 text-tailCall-lightMode---neutral-900 dark:text-tailCall-light-800 group-hover:text-white transition-colors duration-300">
                Features
              </p>
              <ul className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <li
                    key={`${tier.name}-feature-${idx}`}
                    className="flex gap-2 items-center text-lg text-tailCall-darkMode---neutral-700 dark:text-tailCall-darkMode---neutral-400 dark:group-hover:text-white transition-colors duration-300 font-kanit"
                  >
                    <CircleCheck
                      size={12}
                      className="dark:text-tailCall-light-800 mt-0.5 flex-shrink-0 dark:group-hover:text-white transition-colors duration-300"
                    />
                    <span className="text-[16px]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AIProvidersSection: React.FC = () => (
  <div className="flex flex-col gap-10 xl:my-20">
    <div className="bg-gradient-border h-[1px] w-full" />
    <div className="flex flex-col items-center text-center xl:mt-10">
      <span className="font-kanit text-[32px] lg:text-[37px] text-display-tiny font-normal text-tailCall-darkMode---neutral-800 dark:text-white">
        Works with every model offered by leading AI providers.
      </span>
      <span className="font-kanit text-[16px] lg:text-[26px] text-question-title text-tailCall-darkMode---neutral-400 font-light max-w-[50rem] text-center">
        Seamlessly integrate with OpenAI, Anthropic, Google, xAI, Meta, Mistral, and Deepseek models.
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 max-w-5xl mx-auto xl:mb-10">
      {AI_PROVIDERS.map((provider) => (
        <AIProviderCard
          key={provider.title}
          title={provider.title}
          lightLogoUrl={provider.lightLogoUrl}
          darkLogoUrl={provider.darkLogoUrl}
        />
      ))}
    </div>
    <div className="bg-gradient-border h-[1px] w-full" />
  </div>
)

const FAQItem: React.FC<{item: FAQItem; index: number; isOpen: boolean; onToggle: (index: number) => void}> = ({
  item,
  index,
  isOpen,
  onToggle,
}) => {
  const handleToggle = useCallback(() => {
    onToggle(index)
  }, [index, onToggle])

  return (
    <div>
      <div
        className={clsx(
          "flex w-full justify-between items-center pt-8 text-left focus:outline-none bg-transparent dark:bg-black border-none cursor-pointer transition-all duration-300",
          isOpen ? "pb-4" : "pb-8",
        )}
        onClick={handleToggle}
      >
        <span
          className={clsx(
            "text-content-small md:text-question-title",
            isOpen
              ? "text-[#262626] dark:text-white"
              : "text-tailCall-lightMode---neutral-500",
            "transition-colors duration-300",
          )}
        >
          {item.question}
        </span>
        <span className="text-tailCall-darkMode---primary-700 dark:text-white flex items-center justify-center">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </div>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p
          dangerouslySetInnerHTML={{__html: item.answer}}
          className="text-tailCall-darkMode---neutral-600 dark:text-tailCall-light-800 py-1 font-kanit text-content-tiny md:text-[23px] leading-7 md:leading-[35px] font-[275]"
        />
      </div>
      <div className="bg-gradient-border h-[1px] w-full" />
    </div>
  )
}

const FAQSection: React.FC<{openIndex: number | null; onToggle: (index: number) => void}> = ({openIndex, onToggle}) => (
  <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] xl:gap-32 items-start">
    <div className="items-start mt-10">
      <Heading
        as="h2"
        className="text-title-large !font-medium md:text-content-regular text-left mb-1 text-tailCall-lightMode---neutral-900 dark:text-tailCall-white !leading-[65px]"
      >
        Frequently Asked Questions
      </Heading>
      <div className="text-content-small md:text-question-title text-[#A1A1A1] !font-[275] dark:text-tailCall-border-light-300 font-kanit mt-5">
        Select from best plan, ensuring a perfect match. Need more or less? Customize your subscription for a
        seamless fit!
      </div>
    </div>

    <div className="w-full">
      {FAQS.map((item, index) => (
        <FAQItem
          key={`faq-${index}`}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={onToggle}
        />
      ))}
    </div>
  </div>
)

// Main Component
const PricingPage: React.FC = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const location = useLocation()

  // Memoize analytics call
  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Pricing Page"})
  }, [location.pathname])

  // Memoize toggle function
  const toggleIndex = useCallback((index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index)
  }, [])

  // Memoize pricing cards to prevent unnecessary re-renders
  const pricingCards = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-4 max-w-7xl mx-auto pb-12 mb-24">
      {tiers.map((tier) => (
        <PricingCard key={tier.name} tier={tier} />
      ))}
    </div>
  ), [])

  return (
    <Layout title="Pricing" description="Simple, transparent pricing for ForgeCode">
      <HeroSection />
      <main>
        <Section className="py-16 lg:py-24 dark:bg-black bg-tailCall-light-1200">
          <PricingHeader />
          {pricingCards}
          <AIProvidersSection />
          <FAQSection openIndex={openIndex} onToggle={toggleIndex} />
        </Section>
      </main>
    </Layout>
  )
}

export default PricingPage
