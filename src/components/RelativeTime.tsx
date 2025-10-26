import { useEffect, useState } from 'react'

interface RelativeTimeProps {
  datetime: string
  className?: string
}

export function RelativeTime({ datetime, className }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState<string>('')

  useEffect(() => {
    const date = new Date(datetime)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

    let relative: string
    if (diffInSeconds < 60) {
      relative = rtf.format(-diffInSeconds, 'second')
    } else if (diffInSeconds < 3600) {
      relative = rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
    } else if (diffInSeconds < 86400) {
      relative = rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
    } else if (diffInSeconds < 2592000) {
      relative = rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
    } else if (diffInSeconds < 31536000) {
      relative = rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
    } else {
      relative = rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
    }

    setRelativeTime(relative)
  }, [datetime])

  if (!relativeTime) {
    return (
      <time className={className} dateTime={datetime}>
        {new Date(datetime).toLocaleDateString()}
      </time>
    )
  }

  return (
    <time
      className={className}
      dateTime={datetime}
      title={new Date(datetime).toLocaleString()}
    >
      {relativeTime}
    </time>
  )
}
