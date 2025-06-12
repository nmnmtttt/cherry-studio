import { isMac } from '@renderer/config/constant'

function useNavBackgroundColor() {
  if (isMac) {
    return 'transparent'
  }

  return 'var(--navbar-background)'
}

export default useNavBackgroundColor
