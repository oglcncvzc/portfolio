#!/usr/bin/env python3
"""Dev-only plate helpers: pad a reference crop to a Gemini aspect, crop the result back, derive alpha from luminance."""
import sys, json
from PIL import Image
import numpy as np

ASPECTS = {"1:1":1,"3:2":1.5,"4:3":4/3,"16:9":16/9,"21:9":21/9}

def best_aspect(r):
    return min(ASPECTS, key=lambda k: abs(np.log(ASPECTS[k]/r)) if ASPECTS[k]>=r else 9+abs(np.log(ASPECTS[k]/r)))

def pad(src, out, fill):
    im = Image.open(src).convert("RGB"); w,h = im.size; r = w/h
    a = best_aspect(r); A = ASPECTS[a]
    W,H = (round(h*A), h) if A>=r else (w, round(w/A))
    c = Image.new("RGB",(W,H), tuple(fill)); c.paste(im,((W-w)//2,(H-h)//2)); c.save(out)
    json.dump({"aspect":a,"box":[(W-w)/2/W,(H-h)/2/H,w/W,h/H]}, open(out+".pad.json","w"))
    print(a)

def unpad(gen, padjson, out):
    m = json.load(open(padjson)); im = Image.open(gen); W,H = im.size
    x,y,w,h = m["box"]; im.crop((round(x*W),round(y*H),round((x+w)*W),round((y+h)*H))).save(out)

def lumalpha(src, out, mode):
    a = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)/255
    if mode == "white":   # white ink on black: alpha from luminance, colour unpremultiplied
        al = np.clip((a.min(axis=2) - 0.06) / 0.94, 0, 1)
    elif mode == "red":   # red ink on any neutral ground: alpha from redness
        al = np.clip((a[...,0] - np.maximum(a[...,1], a[...,2]) - 0.12) / 0.45, 0, 1)
        rgb = np.clip(a, 0, 1)
        Image.fromarray((np.dstack([rgb, al])*255).astype(np.uint8), "RGBA").save(out); return
    else:                 # coloured glossy ink on black
        al = np.clip((a.max(axis=2) - 0.08) / 0.6, 0, 1)
    rgb = np.where(al[...,None] > 0.001, np.clip(a / np.maximum(al[...,None],1e-3),0,1), 0)
    Image.fromarray((np.dstack([rgb, al])*255).astype(np.uint8), "RGBA").save(out)

if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "pad": pad(sys.argv[2], sys.argv[3], [int(v) for v in sys.argv[4].split(",")])
    elif cmd == "unpad": unpad(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == "lumalpha": lumalpha(sys.argv[2], sys.argv[3], sys.argv[4])
