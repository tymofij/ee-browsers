String.prototype.capitalize = function(){
    return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};

var chart;
$(document).ready(function() {
    series  = [];
    if (window.location.href.indexOf('?') == -1 ) {
        var country = "ukraine"    
    } else {
        var country = window.location.href.slice(window.location.href.indexOf('?') + 1)
    }
    country_name = country.replace(/_/g, ' ').capitalize()
    $("h1").html("Browsers in "+country_name)
    document.title = "Browser history in "+country_name

    var countries = "bulgaria czech_republic estonia hungary latvia lithuania poland slovakia russia turkey ukraine".split(" ")
    $.each(countries, function(itemNo, item) {
        iname = item.replace(/_/g, ' ').capitalize()
        $("#countries").append('<a href="'+window.location.pathname+'?'+item+'" style="background-image:url(flags/'+item+'.png);">'+iname+'</a>')
    });
    
    $.get('csv/'+country+'.csv', function(data) {
        // Split the lines
        var lines = data.split('\n');
        $.each(lines, function(lineNo, line) {
            var items = line.split(',');
            if (items[0]=='""' && items[1]!='""'){
                // that's the header
                $.each(items.slice(1), function(itemNo, item) {
                    item = item.replace(/"/g, '')                
                    if (item == "Opera")
                        series[itemNo] = { name: 'Opera', color: "red", icon: "opera.png", data: [] }
                    else if (item == "Gecko")
                        series[itemNo] = { name: 'Gecko', color: "#FF8040", icon: "firefox.png", data: [] }
                    else if (item == "MSIE")
                        series[itemNo] = { name: 'MSIE', color: "blue", icon: "ie.png", data: [] }
                    else if (item == "WebKit/KHTML")
                        series[itemNo] = { name: 'Webkit', color: "green", icon: "chrome.png", data: [] }
                })
            } else {// either comment or meat
                $.each(items, function(itemNo, item) {
                    item = item.replace(/"/g, '')
                    if (item && !isNaN(item.slice(0,1))) { // that is a number, workit
                        if (itemNo == 0) { 
                            // date
                            chunks = item.split(".")
                            date = Date.UTC(chunks[2], chunks[1]-1, chunks[0])
                        } else {
                            series[itemNo-1].data.push({x:date, y:parseFloat(item) });
                        }
                    }
                });
            }
        });
        
        chart = new Highcharts.Chart({
        chart: {
            spacingRight:0, spacingLeft:0, spacingTop:0, spacingBottom:0,
            renderTo: 'highchart',
            zoomType: 'x'
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },      
        title: { text: null },
        xAxis: { type: 'datetime' },
        yAxis: {
                title: { text: '%' },
                min: 0, 
                endOnTick: false
        },
        tooltip: {
            borderColor: "gray",
            crosshairs: true,
            shared: (!$.browser.opera)
        },
        legend: { enabled: false },
        series: series,
        credits: { position: {y: 20} }
        });

        $.each(chart.series, function(itemNo, item) {
            $("#container").append('<img src="icons/'+series[itemNo].icon+'" style="position:absolute;left:0;top:'+(item.data[0].plotY-10)+'px;"/>')
        });
    });
});

