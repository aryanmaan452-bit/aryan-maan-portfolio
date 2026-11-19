import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function attachMotion(root: HTMLElement) {
  const media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('[data-entrance]', {
      y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', clearProps: 'opacity,transform',
    })
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 22, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 96%', once: true },
      })
    })
  }, root)
  media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 768px)', () => {
    const hero = root.querySelector<HTMLElement>('.hero')!
    const art = hero.querySelector<HTMLElement>('.orbit-motion')!
    const x = gsap.quickTo(art, 'x', { duration: 0.7, ease: 'power3.out' })
    const y = gsap.quickTo(art, 'y', { duration: 0.7, ease: 'power3.out' })
    const move = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect()
      x(((event.clientX - box.left) / box.width - 0.5) * 34)
      y(((event.clientY - box.top) / box.height - 0.5) * 34)
    }
    const reset = () => { x(0); y(0) }
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', reset)
    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
    }
  }, root)
  return () => media.revert()
}
