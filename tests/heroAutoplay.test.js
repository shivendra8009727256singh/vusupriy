import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHeroAutoplay } from '../src/components/home/heroAutoplay.js'

function fixture({ reduced = false } = {}) {
  let clock = 0; let id = 0
  const timers = new Map(); const listeners = new Map(); const mediaListeners = new Map(); const changes = []; const settles = []
  const images = Array.from({length:4},()=>({complete:true,naturalWidth:100,decode:()=>Promise.resolve()}))
  const doc = {visibilityState:'visible',addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener:type=>listeners.delete(type)}
  const media = {matches:reduced,addEventListener:(type,fn)=>mediaListeners.set(type,fn),removeEventListener:type=>mediaListeners.delete(type)}
  const win = {matchMedia:()=>media,setTimeout:(fn,delay)=>{timers.set(++id,{fn,at:clock+delay});return id},clearTimeout:id=>timers.delete(id)}
  const cleanup=createHeroAutoplay({images,window:win,document:doc,onChange:(current,previous)=>changes.push([current,previous]),onSettle:()=>settles.push(true)})
  const tick=async duration=>{clock+=duration;const due=[...timers.entries()].filter(([,timer])=>timer.at<=clock);for(const [id,timer] of due){timers.delete(id);timer.fn()}await new Promise(resolve=>setImmediate(resolve))}
  return {images,doc,media,timers,listeners,mediaListeners,changes,settles,tick,cleanup}
}

test('autoplay holds five seconds, crossfades and loops all four slides',async()=>{
  const f=fixture();await f.tick(4999);assert.deepEqual(f.changes,[])
  await f.tick(1);assert.deepEqual(f.changes,[[1,0]])
  await f.tick(1200);assert.equal(f.settles.length,1)
  for(let i=0;i<3;i++){await f.tick(5000);await f.tick(1200)}
  assert.deepEqual(f.changes,[[1,0],[2,1],[3,2],[0,3]]);f.cleanup()
})

test('hidden tabs pause and repeated visibility events never duplicate timers',async()=>{
  const f=fixture();f.doc.visibilityState='hidden';f.listeners.get('visibilitychange')();assert.equal(f.timers.size,0)
  await f.tick(20000);assert.deepEqual(f.changes,[])
  f.doc.visibilityState='visible';for(let i=0;i<5;i++)f.listeners.get('visibilitychange')()
  assert.equal(f.timers.size,1);await f.tick(5000);assert.deepEqual(f.changes,[[1,0]]);f.cleanup()
})

test('reduced motion keeps first image static and live preference changes reset it',async()=>{
  const f=fixture({reduced:true});assert.equal(f.timers.size,0);await f.tick(20000);assert.deepEqual(f.changes,[])
  f.media.matches=false;f.mediaListeners.get('change')();await f.tick(5000);assert.deepEqual(f.changes,[[1,0]])
  f.media.matches=true;f.mediaListeners.get('change')();assert.deepEqual(f.changes.at(-1),[0,null]);assert.equal(f.timers.size,0);f.cleanup()
})

test('decode must finish before switching and pending work cannot commit after unmount',async()=>{
  const f=fixture();let ready;f.images[1].decode=()=>new Promise(resolve=>{ready=resolve})
  await f.tick(5000);assert.deepEqual(f.changes,[]);f.cleanup();ready();await Promise.resolve();await Promise.resolve()
  assert.deepEqual(f.changes,[]);assert.equal(f.timers.size,0);assert.equal(f.listeners.size,0);assert.equal(f.mediaListeners.size,0)
})

test('a failed bitmap is skipped while the current image remains visible',async()=>{
  const f=fixture();f.images[1].decode=()=>Promise.reject(new Error('missing'))
  await f.tick(5000);assert.deepEqual(f.changes,[[2,0]]);f.cleanup()
})


test('hiding mid-crossfade retains its outgoing base until a visible settle',async()=>{
  const f=fixture();await f.tick(5000);f.doc.visibilityState='hidden';f.listeners.get('visibilitychange')()
  assert.equal(f.settles.length,0);assert.equal(f.timers.size,0)
  f.doc.visibilityState='visible';f.listeners.get('visibilitychange')();assert.equal(f.timers.size,1)
  await f.tick(1200);assert.equal(f.settles.length,1);assert.equal(f.timers.size,1);f.cleanup()
})
