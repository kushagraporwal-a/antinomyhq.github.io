import React, {useCallback, useMemo, useRef, useState} from "react"
import {createPortal} from "react-dom"
import {DocSearchButton} from "@docsearch/react"
import Head from "@docusaurus/Head"
import Link from "@docusaurus/Link"
import {useHistory} from "@docusaurus/router"
import {isRegexpStringMatch, useSearchLinkCreator} from "@docusaurus/theme-common"
import {useAlgoliaContextualFacetFilters, useSearchResultUrlProcessor} from "@docusaurus/theme-search-algolia/client"
import Translate from "@docusaurus/Translate"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import translations from "@theme/SearchTranslations"
import {useHotkeys} from "react-hotkeys-hook"

import type {AutocompleteState} from "@algolia/autocomplete-core"
import type {DocSearchModal as DocSearchModalType, DocSearchModalProps} from "@docsearch/react"
import type {InternalDocSearchHit, StoredDocSearchHit} from "@docsearch/react/dist/esm/types"
import type {SearchClient} from "algoliasearch/lite"
import {algoliaConstants} from "@site/src/constants"

type DocSearchProps = Omit<DocSearchModalProps, "onClose" | "initialScrollY"> & {
  contextualSearch?: string
  externalUrlRegex?: string
  searchPagePath: boolean | string
}

let DocSearchModal: typeof DocSearchModalType | null = null

function Hit({hit, children}: {hit: InternalDocSearchHit | StoredDocSearchHit; children: React.ReactNode}) {
  return <Link to={hit.url}>{children}</Link>
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>
  onClose: () => void
}

function ResultsFooter({state, onClose}: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator()

  return (
    <div className="flex justify-between w-full">
      <span>{`${state.context.nbHits} results found`}</span>
      <Link to={createSearchLink(state.query)} onClick={onClose}>
        <Translate id="theme.SearchBar.seeAll">{"See all results"}</Translate>
      </Link>
    </div>
  )
}

type FacetFilters = Required<Required<DocSearchProps>["searchParameters"]>["facetFilters"]

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
  const normalize = (f: FacetFilters): readonly string[] | readonly (string | readonly string[])[] =>
    typeof f === "string" ? [f] : f
  return [...normalize(f1), ...normalize(f2)] as FacetFilters
}

function DocSearch({contextualSearch, externalUrlRegex, ...props}: DocSearchProps) {
  const {siteMetadata} = useDocusaurusContext()
  const processSearchResultUrl = useSearchResultUrlProcessor()

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters() as FacetFilters

  const configFacetFilters: FacetFilters = props.searchParameters?.facetFilters ?? []

  const facetFilters: FacetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters

  // We let user override default searchParameters if she wants to
  const searchParameters: DocSearchProps["searchParameters"] = {
    ...props.searchParameters,
    facetFilters,
  }

  const history = useHistory()
  const searchContainer = useRef<HTMLDivElement | null>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined)

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }

    return Promise.all([
      import("@docsearch/react/modal") as Promise<typeof import("@docsearch/react")>,
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{DocSearchModal: Modal}]) => {
      DocSearchModal = Modal
    })
  }, [])

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement("div")
      searchContainer.current = divElement
      document.body.insertBefore(divElement, document.body.firstChild)
    }
  }, [])

  const openModal = useCallback(() => {
    prepareSearchContainer()
    importDocSearchModalIfNeeded().then(() => setIsOpen(true))
  }, [importDocSearchModalIfNeeded, prepareSearchContainer])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    searchButtonRef.current?.focus()
  }, [])

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      // prevents duplicate key insertion in the modal input
      event.preventDefault()
      setInitialQuery(event.key)
      openModal()
    },
    [openModal],
  )

  const navigator = useRef({
    navigate({itemUrl}: {itemUrl?: string}) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl!
      } else {
        history.push(itemUrl!)
      }
    },
  }).current

  const transformItems = useRef<DocSearchModalProps["transformItems"]>((items) =>
    props.transformItems
      ? // Custom transformItems
        props.transformItems(items)
      : // Default transformItems
        items.map((item) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        })),
  ).current

  const resultsFooterComponent: DocSearchProps["resultsFooterComponent"] = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      (footerProps: Omit<ResultsFooterProps, "onClose">): JSX.Element => (
        <ResultsFooter {...footerProps} onClose={closeModal} />
      ),
    [closeModal],
  )

  const transformSearchClient = useCallback(
    (searchClient: SearchClient) => {
      searchClient.addAlgoliaAgent("docusaurus", siteMetadata.docusaurusVersion)

      return searchClient
    },
    [siteMetadata.docusaurusVersion],
  )

  // Use react-hotkeys-hook for cross-platform keyboard shortcuts
  // This handles Cmd+K on Mac and Ctrl+K on Windows/Linux automatically
  useHotkeys(
    "mod+k",
    (event) => {
      event.preventDefault()
      if (!isOpen) {
        openModal()
      }
    },
    {
      enableOnFormTags: false, // Don't trigger when typing in forms
      preventDefault: true,
    },
    [isOpen, openModal],
  )

  // Handle Escape key to close modal
  useHotkeys(
    "escape",
    (event) => {
      if (isOpen) {
        event.preventDefault()
        closeModal()
      }
    },
    {
      enableOnFormTags: true, // Allow Escape even when in forms
      preventDefault: false, // Only prevent default if modal is open
    },
    [isOpen, closeModal],
  )

  // Handle single character input to open search (but not when in input fields)
  useHotkeys(
    "a-z,0-9",
    (event) => {
      // Check if we're not in an input field and modal is not open
      const activeElement = document.activeElement
      const isInInput =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.hasAttribute("contenteditable"))

      if (!isInInput && !isOpen) {
        handleInput(event)
      }
    },
    {
      enableOnFormTags: false,
      preventDefault: false, // Let the character input be handled by handleInput
    },
    [isOpen, handleInput],
  )

  // Note: We explicitly do NOT handle Cmd+F or Ctrl+F here
  // This allows the browser's native find functionality to work properly

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link rel="preconnect" href={`https://${props.appId}-dsn.algolia.net`} crossOrigin="anonymous" />
      </Head>

      <DocSearchButton
        className="border-none bg-transparent cursor-pointer"
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
        translations={translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
            placeholder={algoliaConstants.searchModalPlaceholder}
            translations={translations.modal}
          />,
          searchContainer.current,
        )}
    </>
  )
}

export default function SearchBar(): JSX.Element {
  const {siteConfig} = useDocusaurusContext()
  return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />
}
