import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assemblyProgress, remapProgress, easeAssembly, assemblyState, assemblyValues, firstWhyRowProgress } from '../src/hooks/scrollReveal.js'

test('assembly geometry resolves initial, intermediate, final, reverse and resized states',()=>{
  assert.equal(assemblyProgress(1000,1000),0)
  assert.equal(assemblyProgress(980,1000),0)
  assert.equal(assemblyProgress(750,1000),0.5)
  assert.equal(assemblyProgress(520,1000),1)
  assert.equal(assemblyProgress(-2000,1000),1)
  assert.equal(assemblyProgress(0,0),1)
  assert.ok(assemblyProgress(850,1000)<assemblyProgress(700,1000))
  assert.ok(assemblyProgress(750,1200)>assemblyProgress(750,1000))
})

test('assembly child remapping and cubic easing keep exact separated and final positions',()=>{
  assert.equal(remapProgress(0.25,0.25,0.75),0)
  assert.equal(remapProgress(0.5,0.25,0.75),0.5)
  assert.equal(remapProgress(0.9,0.25,0.75),1)
  assert.equal(easeAssembly(0.5),0.5)
  const origin={x:120,y:0,opacity:0.2,scale:1.04,clip:12}
  const initial=assemblyState(0,origin)
  const middle=assemblyState(0.5,origin)
  assert.equal(initial.x,120);assert.equal(initial.opacity,0.2)
  assert.equal(middle.x,60);assert.ok(Math.abs(middle.opacity-0.6)<1e-12)
  assert.deepEqual(assemblyState(1,origin),{x:0,y:0,opacity:1,scale:1,clip:0,progress:1})
  assert.equal(assemblyState(0.3,origin).x>middle.x,true)
  assert.equal(assemblyState(0.5,origin,0.65).x,39)
  assert.equal(assemblyState(0,origin,1,true).x,30)
  assert.equal(assemblyState(0,{x:-25,y:-28}).y,-28)
})

test('one section progress drives differing child ranges and tall-section viewport windows',()=>{
  const targets=[{group:'about',range:[0.08,0.55]},{group:'about',range:[0.28,0.82]}]
  const result=assemblyValues(targets,[{top:750},{top:750}],1000)
  assert.equal(result.groups.size,1);assert.equal(result.groups.get('about').progress,0.5)
  assert.ok(result.values[0]>result.values[1])
  const tall=assemblyValues(targets,[{top:750},{top:1200}],1000)
  assert.ok(tall.values[0]>0);assert.equal(tall.values[1],0)
  const late=assemblyValues(targets,[{top:-1000},{top:-550}],1000)
  assert.deepEqual(late.values,[1,1])
  assert.deepEqual(assemblyValues(targets,[{top:0},{top:300}],0).values,[1,1])
})

test('Why first row waits for an established heading and beginning supporting copy',()=>{
  assert.equal(firstWhyRowProgress(1,0.05,1),0)
  assert.ok(firstWhyRowProgress(1,0.3,0.8)>0)
  assert.ok(firstWhyRowProgress(1,0.3,0.8)<1)
  assert.equal(firstWhyRowProgress(1,0.6,1),1)
  assert.equal(firstWhyRowProgress(1,0.6,0.5),0)
  assert.equal(firstWhyRowProgress(0.2,1),0.2)
})


test('assembly CSS disables scroll transitions and keeps the overflow guard',async()=>{
  const { readFile }=await import('node:fs/promises')
  const css=await readFile(new URL('../src/App.css',import.meta.url),'utf8')
  const globalCSS=await readFile(new URL('../src/index.css',import.meta.url),'utf8')
  assert.match(css,/\.motion-enabled \[data-scroll-reveal\] \{\s*transition: none;/)
  assert.match(globalCSS,/#root\s*\{[^}]*overflow-x: clip;/)
})
