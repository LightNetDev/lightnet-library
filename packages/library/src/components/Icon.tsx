/**
 * Icon Component.
 *
 * @param class containing a material design icon name prefixed with 'mdi--'
 * @see https://pictogrammers.com/library/mdi/ for available icons
 * @returns icon
 */
export default function ({ class: className }: { class?: string }) {
  return <span class={`iconify text-2xl ${className ?? ""}`} />
}
