/**
 * Icon Component.
 *
 * @param className containing a material design icon name prefixed with 'mdi--'
 * @param ariaLabel accessibility label to be added e.g. for people using a screen reader.
 * @param flipIcon if set to true this will mirror the icon along its x-axis. Useful for RTL layouts.
 * @see https://pictogrammers.com/library/mdi/ for available icons
 * @returns icon
 */
export default function Icon({
  className,
  ariaLabel,
  flipIcon,
}: {
  className: string
  ariaLabel?: string
  flipIcon?: boolean
}) {
  return (
    <span
      className={`iconify text-2xl ${className} ${flipIcon && "scale-x-[-1]"}`}
      aria-label={ariaLabel}
    />
  )
}
