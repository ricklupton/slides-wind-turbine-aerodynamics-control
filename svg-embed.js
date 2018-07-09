function embedSVGs(callback) {
  var svgs = d3.selectAll('svg[data-src]')
  var remaining = svgs.size()

  svgs.each(function () {
    var svg = this;
    d3.xml(svg.getAttribute('data-src'), function(error, data) {
      if (error) throw error;
      var newSVG = data.documentElement;
      replaceAttributes(newSVG, svg);
      svg.parentNode.replaceChild(newSVG, svg);

      // var initial = svg.getAttribute('data-initial');
      // if (initial) {
      //   initial.split(/\s+/).forEach(function(id) {
      //     console.log(id, d3.select(newSVG).select(id));
      //     d3.select(newSVG).select('#' + id).classed('fragment', false);
      //   });
      // }

      var fragments = svg.getAttribute('data-fragments');
      if (fragments) {
        fragments.split(/\s+/).forEach(function(part) {
          var i = part.indexOf('@');
          var id, index;
          if (i < 0) {
            id = part;
            index = null;
          } else {
            id = part.slice(0, i)
            index = +part.slice(i + 1)
          }
          d3.select(newSVG).select('#' + id)
            .classed('fragment', true)
            .attr('data-fragment-index', index)
            .style('display', 'inline');
        });
      }

      if (--remaining === 0) {
        if (callback) callback()
      }
    });
  });
}

function replaceAttributes(new_, old) {
	for (var i = 0; i < old.attributes.length; i++) {
		var attr = old.attributes[i];
		new_.setAttribute(attr.name, attr.value);
	}
}
// let loadSVGs = svgsToLoad.map(svg => fetch(svg.getAttribute('data-src'))
// 		                          .then(response => response.text())
// 		                          .then(svgCode => {
// 			                          let svgDoc = new DOMParser().parseFromString(svgCode, 'image/svg+xml')
// 		                          })
// 		                          .catch(error => {
// 			                          if (!(error instanceof TypeError))
// 				                          throw error
// 			                          let img = document.createElement('img')
// 			                          img.setAttribute('src', svg.getAttribute('data-src'))
// 			                          replaceAttributes(img, svg)
// 			                          svg.parentNode.replaceChild(img, svg)
// 		                          }))
