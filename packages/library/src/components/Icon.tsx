/**
 * Icon Component.
 *
 * @param class containing a material design icon name prefixed with 'mdi--'
 * @see https://pictogrammers.com/library/mdi/ for available icons
 * @returns icon
 */
export default function Icon({ className }: { className?: string }) {
  return <span className={`iconify text-2xl ${className ?? ""}`} />
}
