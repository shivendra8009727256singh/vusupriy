import { useEffect, useState } from 'react'

// Latest request wins. A failed decode leaves the previously visible selection intact.
export function createDecodedSelection(onCommit) {
  let generation = 0
  const cancel = () => { generation += 1 }
  return {
    cancel,
    select(index, image, onReady = onCommit) {
      const request = ++generation
      const commit = () => {
        if (request !== generation) return
        const layer = image?.closest?.('.home-product-layer') || image
        const stage = layer?.parentElement
        stage?.querySelectorAll('.motion-image-outgoing').forEach(element => element.classList.remove('motion-image-outgoing'))
        const outgoing = stage?.querySelector('.home-product-layer--active, .home-service-image--active')
        if (outgoing && outgoing !== layer) outgoing.classList.add('motion-image-outgoing')
        onReady(index)
      }
      if (image?.decode) image.decode().then(commit).catch(() => {})
      else commit()
    },
  }
}

export default function useDecodedSelection(initial = 0) {
  const [selected, setSelected] = useState(initial)
  const [controls] = useState(() => createDecodedSelection(setSelected))
  useEffect(() => () => controls.cancel(), [controls])
  return [selected, controls]
}
