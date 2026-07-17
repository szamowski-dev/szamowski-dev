"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const emailAddress = siteConfig.email
const resetDelay = 2400

type CopyState = "idle" | "copied" | "manual" | "error"

export function CopyEmail() {
  const [copyState, setCopyState] = React.useState<CopyState>("idle")
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current)
      }
    }
  }, [])

  function resetLater() {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current)
    }

    resetTimer.current = setTimeout(() => setCopyState("idle"), resetDelay)
  }

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) {
        const didOpenPrompt = window.prompt("Copy this email address:", emailAddress) !== null

        setCopyState(didOpenPrompt ? "manual" : "idle")
        if (didOpenPrompt) resetLater()
        return
      }

      await navigator.clipboard.writeText(emailAddress)
      setCopyState("copied")
      resetLater()
    } catch {
      const didOpenPrompt = window.prompt("Copy this email address:", emailAddress) !== null

      setCopyState(didOpenPrompt ? "manual" : "error")
      resetLater()
    }
  }

  const isCopied = copyState === "copied"
  const announcement =
    copyState === "copied"
      ? "Email address copied to clipboard."
      : copyState === "manual"
        ? "Select and copy the email address from the dialog."
        : copyState === "error"
          ? "Copying is unavailable. The email address is shown on the page."
          : ""

  return (
    <>
      <Button
        className="copy-email min-h-11"
        type="button"
        variant="outline"
        onClick={copyEmail}
      >
        {isCopied ? (
          <CheckIcon data-icon="inline-start" aria-hidden="true" />
        ) : (
          <CopyIcon data-icon="inline-start" aria-hidden="true" />
        )}
        {isCopied ? "Copied" : "Copy email"}
      </Button>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </>
  )
}
