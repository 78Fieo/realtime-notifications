import { useMemo } from 'react'

export default function useDeviceMotionProfile(reducedMotion) {
  return useMemo(() => {
    if (typeof navigator === 'undefined') {
      return {
        reducedMotion,
        lowEndDevice: false,
        motionLevel: reducedMotion ? 'minimal' : 'full',
        allowComplexMotion: !reducedMotion,
      }
    }

    const cpuCores = navigator.hardwareConcurrency || 8
    const memory = navigator.deviceMemory || 8
    const saveData = Boolean(navigator.connection?.saveData)

    const lowEndDevice = cpuCores <= 4 || memory <= 4 || saveData
    const minimal = reducedMotion || lowEndDevice

    return {
      reducedMotion,
      lowEndDevice,
      motionLevel: minimal ? 'minimal' : 'full',
      allowComplexMotion: !minimal,
    }
  }, [reducedMotion])
}
