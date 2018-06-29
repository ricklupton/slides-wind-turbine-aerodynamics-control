slides.html: slides.md
	pandoc -t revealjs -V revealjs-url=reveal.js -s $^ -o $@ --mathjax --slide-level=2

# --standalone --self-contained
