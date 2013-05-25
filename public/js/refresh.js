Graphiti = window.Graphiti || {};

Graphiti.resizeImages = function() {
    var n = readArgument('n', 4);
    var window_width = $(window).width();
    var ratio = 1.7;
    var graph_width = Math.floor(window_width / n);
    var graph_height = Math.floor(graph_width / ratio);
    $('.pane .ggraph').each(function(index, value) {
    	var src = value.src;
    	src = src.replace(/width=.*?&/,'width='+graph_width+'&');
    	src = src.replace(/height=.*?&/,'height='+graph_height+'&');
    	value.src = src;
    });
    $('.graph').width(graph_width + 'px');
    $('#graphs-pane .graph img').height(graph_height + 'px');
    this.refresh();
}

Graphiti.refresh = function(){
    $('#graphs-pane div.graph img.ggraph').each(function() {
      var jqt = $(this);
      var src = jqt.attr('src');
      //src     = src.substr(0,src.indexOf('_timestamp_'));
      //src    += '_timestamp_=' + new Date().getTime() + "000#.png";
      src.replace(/(^.*_timestamp_=).*/, function (match, _1) { return  _1 +  new Date().getTime() + "000#.png"; })
      jqt.attr('src',src);
    });
}

Graphiti.startRefresh = function(seconds){
  this.refreshTimer = setInterval(this.refresh, seconds * 1000);
};

Graphiti.stopRefresh = function(){
  clearInterval(this.refreshTimer);
};

Graphiti.setRefresh = function(){
  if ($('#auto-refresh').prop('checked')) {
    console.log("starting");
    this.startRefresh($('#auto-refresh').data('interval'));
  } else {
    console.log("stop");
    this.stopRefresh();
  }
};

$(Graphiti.setRefresh.bind(Graphiti));
$("#auto-refresh").change(Graphiti.setRefresh.bind(Graphiti));
