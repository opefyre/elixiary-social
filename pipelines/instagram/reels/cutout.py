"""Key a flat background, but only where it touches the image border: any
keyed pixel not connected to the edge is an interior highlight (an eye, a
glint) and is put back. Pure Python on the raw RGBA plane; no PIL needed."""
import subprocess, sys
from collections import deque
src, dst, key, tol = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
w, h = [int(x.split(":")[1]) for x in subprocess.run(["ffprobe","-v","error","-show_entries","stream=width,height","-of","csv=p=0:s=:",src],capture_output=True,text=True).stdout.strip().split(":")[:0]] or (0,0)
probe = subprocess.run(["ffprobe","-v","error","-show_entries","stream=width,height","-of","csv=p=0",src],capture_output=True,text=True).stdout.strip().split(",")
w, h = int(probe[0]), int(probe[1])
raw = bytearray(subprocess.run(["ffmpeg","-v","error","-i",src,"-f","rawvideo","-pix_fmt","rgba","-"],capture_output=True).stdout)
kr, kg, kb = int(key[0:2],16), int(key[2:4],16), int(key[4:6],16)
def near(i):
    r,g,b = raw[i*4],raw[i*4+1],raw[i*4+2]
    return ((r-kr)**2+(g-kg)**2+(b-kb)**2) ** .5 <= tol*441.7
bg = bytearray(w*h); q = deque()
for x in range(w):
    for y in (0,h-1):
        i=y*w+x
        if near(i) and not bg[i]: bg[i]=1; q.append(i)
for y in range(h):
    for x in (0,w-1):
        i=y*w+x
        if near(i) and not bg[i]: bg[i]=1; q.append(i)
while q:
    i=q.popleft(); x,y=i%w,i//w
    for nx,ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
        if 0<=nx<w and 0<=ny<h:
            j=ny*w+nx
            if not bg[j] and near(j): bg[j]=1; q.append(j)
# soften: a 1px feather so edges are not razor-hard
for i in range(w*h):
    raw[i*4+3] = 0 if bg[i] else 255
subprocess.run(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgba","-s",f"{w}x{h}","-i","-","-vf","format=rgba",dst],input=bytes(raw),check=True)
print("cut", dst, "bg px:", sum(bg), "/", w*h)
