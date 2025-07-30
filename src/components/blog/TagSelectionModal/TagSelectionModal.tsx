import React, {useEffect, useMemo, useState} from "react"
import {blogTagsMapping} from "@site/src/constants"
import clsx from "clsx"
import {X, Search} from "lucide-react"
import styles from "./styles.module.css"
import Chip from "../../shared/Chip"
import {useHistory} from "@docusaurus/router"

interface TagSelectionModalProps {
  open: boolean
  onClose?: () => void
}

const TagSelectionModal: React.FC<TagSelectionModalProps> = ({open, onClose}) => {
  const [query, setQuery] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (typeof window === "undefined") return

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [open])

  const getSearchResults = () => {
    const lowerCaseQuery = query.toLowerCase()
    if (!lowerCaseQuery) return []
    const matches: BlogTag[] = blogTagsMapping.filter((tag) => tag.label.toLowerCase().startsWith(lowerCaseQuery))
    return matches
  }

  const handleModalClose = () => {
    setQuery("")

    if (onClose) {
      onClose()
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const searchResults = useMemo(() => {
    return getSearchResults()
  }, [query])

  return (
    <>
      {open ? (
        <>
          {/* Overlay */}
          <div
            className={clsx(
              "block lg:hidden fixed inset-0 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-50",
              styles.modalOverlay,
            )}
            onClick={handleModalClose}
          ></div>

          {/* Modal Container */}
          <div
            className={clsx(
              "absolute w-full lg:w-4/12 h-full right-0 bg-tailCall-light-1200 dark:bg-black rounded-xl lg:rounded-none lg:border lg:border-solid border-t-transparent dark:lg:border-tailCall-lightMode---neutral-600 lg:border-tailCall-lightMode---neutral-300 px-4 py-8 lg:px-10 lg:py-8 flex flex-col gap-8",
              styles.modalContainer,
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-title-medium !font-normal font-kanit lg:text-title-large text-black dark:text-white">
                Explore All Tags
              </span>
              <X width={24} height={24} className="cursor-pointer" onClick={handleModalClose} />
            </div>
            <div className="flex flex-col gap-5 pb-36">
              <div className="flex items-center gap-3 border border-solid border-tailCall-border-light-500 rounded-lg py-2 px-6">
                <Search width={20} height={20} className="text-tailCall-light-500" />
                <input
                  name="tag"
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search Tags"
                  className="text-black dark:text-white placeholder:text-tailCall-light-500 bg-transparent border-none outline-none font-kanit text-content-small"
                />
              </div>
              <div className="overflow-scroll max-h-[70vh]">
                <div className="flex flex-wrap gap-5">
                  {searchResults.length === 0 && <p className="font-kanit">No tags found</p>}
                  {searchResults.map(({label, permalink}) => {
                    return (
                      <Chip
                        label={label}
                        key={label}
                        onClick={() => {
                          handleModalClose()
                          history.push(permalink)
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default TagSelectionModal
