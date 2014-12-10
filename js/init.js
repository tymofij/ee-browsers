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
    var title = "Browsers in " + country.replace(/_/g, ' ').capitalize()
    $("h1").html(title)
    document.title = title
    $(".twitter-share-button").attr({
        'data-url': window.location.href,
        'data-text': title
    })

    var countries = "bulgaria czech_republic estonia hungary latvia lithuania poland slovakia russia turkey ukraine".split(" ")
    $.each(countries, function(itemNo, item) {
        iname = item.replace(/_/g, ' ').capitalize()
        $("#countries").append('<a href="'+window.location.pathname+'?'+item+'" style="background-image:url(flags/'+item+'.png);">'+iname+'</a>')
    });

    $.get('json/'+country+'.json', function(data) {
        var series = {}
        $.each(data.coding, function(code, browser){
            // var browser = data.coding[code]
            if (browser.name == "Opera") {
                series[code] = { name: 'Opera', color: "red", icon: "opera.png", data: [] }
            } else if (browser.name == "Gecko") {
                series[code] = { name: 'Gecko', color: "#FF8040", icon: "firefox.png", data: [] }
            } else if (browser.name == "MSIE") {
                series[code] = { name: 'MSIE', color: "blue", icon: "ie.png", data: [] }
            } else if (browser.name == "WebKit/KHTML") {
                series[code] = { name: 'Webkit', color: "green", icon: "chrome.png", data: [] }
            }
        })
        $.each(data.data, function(i, day){
            var date = new Date(day.__TIME__ * 1000)
            $.each(day, function(key, val){
                if (key != "__TIME__") {
                    series[key].data.push({x:date, y:val })
                }
            })
        })
        var arr_series = []
        $.each(series, function(key, val){
            arr_series.push(val);
        })

        chart = new Highcharts.Chart({
            chart: {
                spacingRight:0, spacingLeft:0, spacingTop:0, spacingBottom:1,
                renderTo: 'highchart',
                zoomType: 'x'
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
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
                shared: true
            },
            legend: { enabled: false },
            series: arr_series,
        });

        $.each(chart.series, function(key, val) {
            $("#container").append('<img src="icons/'+arr_series[key].icon+'" style="position:absolute;left:0;top:'+(val.data[0].plotY-10)+'px;"/>')
        });
    });
});

