import { useState } from "react"

import Icon from "../../../../components/Icon"

export default function Download({
  href,
  fileName,
  label,
}: {
  href: string
  fileName: string
  label: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadFile = () => {
    setIsDownloading(true)
    fetch(href)
      .then((response) => response.blob())
      .then((blob) => {
        setIsDownloading(false)
        const blobURL = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = blobURL
        a.classList.add("hidden")
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blobURL)
      })
  }

  return (
    <button
      className="flex items-center justify-center gap-2 rounded-2xl bg-gray-200 px-4 py-2 text-xs font-bold uppercase text-gray-600 shadow-sm hover:bg-gray-300"
      disabled={isDownloading}
      onClick={() => downloadFile()}
    >
      <Icon className="mdi--download" />
      {label}
    </button>
  )
}
