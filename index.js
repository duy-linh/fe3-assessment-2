/* Gebaseerd op Mike Bostock's Bar Chart August 20, 2017 https://bl.ocks.org/mbostock/3885304. Aantal aanpassingen zijn gedaan door mij, deze zullen aangegeven worden met een comment, daarnaast zal het ook aangegeven worden in de readme.md */

/* Link naar de dataset http://statline.cbs.nl/StatWeb/publication/?VW=T&DM=SLNL&PA=83739NED&LA=NL, in de readme.md wordt uitgelegd hoe je deze dataset download */

// Hier wordt een een variable svg gemaakt, vervolgens worden er margins toegevoegd aan het canvas van de svg.
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 120, left: 70}, 
    width = +svg.attr("width") - margin.left - margin.right, 
    height = +svg.attr("height") - margin.top - margin.bottom;

// Hier wordt de bar gecalculeerd, zodat het in een passende manier wordt geplaatst. https://medium.com/@mbostock/introducing-d3-scale-61980c51545f
var x = d3.scaleBand().rangeRound([0, width]).padding(0.35),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Hier wordt de data ingeladen, daarnaast wordt er een mimetype ingesteld zodat tekst huist gepard wordt. Gebaseerd op de code die in de slides staan van les 3.
// Link naar slides: https://docs.google.com/presentation/d/1TpoPilc1qVIQU07u_IdPeNqSZcbgliPaLF0zZUWGvWE/edit#slide=id.g2578b5da0f_0_138
d3.text('data.csv').mimeType('text/plain;charset=iso88591').get(onload);

// Hier wordt een error gegeven, wanneer er geen data is gevonden
function onload(err, doc) {
  if (err) {
    throw err;
  }

// Hier wordt de data gecleaned. Gebaseerd op de code die in de slides staan van les 3
// Hier wordt de header weggehaald
var header = doc.indexOf('"Perioden";"Kenmerken van huishoudens";"1 000 euro"')
    var end = doc.indexOf('\n', header)
    doc = doc.slice(end).trim()

// Hier haal ik bepaalde woorden uit de benamingen van huishoudens weg
// Ik vervang de woorden met 'niets'
    doc = doc.replace(/Type:/g, '')
    doc = doc.replace(/Bron:/g, '')
    doc = doc.replace(/Hoofdkostwinner:/g, '')
    
// Hier vervang ik alle ';' met een ','
    doc = doc.replace(/;/g, ',')

var data = d3.csvParseRows(doc, map)
    function map(d) {
    return {
        huishouden: d[1],
        inkomen: Number(d[2])
    }
}

// Hier wordt de footer geremoved. Code via #frontend-3 channel van @deshlieee.
var footer = data.indexOf('� Statistics Netherlands, Den Haag/Heerlen 12-10-2017');
var remove = data.splice(footer);


// Hier wordt alle data gepakt, waarna er een passende schaal wordt gemaakt 'domain/range'
x.domain(data.map(function(d) { return d.huishouden; }));
y.domain([0, d3.max(data, function(d) { return d.inkomen; })]);

    
// De code hieronder is gebaseerd op de voorbeeld 'sort' van @wooorm
// Link naar voorbeeld 'sort': https://cmda-fe3.github.io/course-17-18/class-4/sort/
// Hier is de trigger van de sorteer event, er wordt gekeken of de in input is veranderd
d3.select('input').on('change', onchange);

// Hier wordt de functie aangeroepen    
function onchange() {

// Hier wordt gekeken of sortOnInkomen is aangeklikt, wanneer dat niet zo is, wordt sortOnHuishouden gecalled
var sort = this.checked ? sortOnInkomen : sortOnHuishouden;
var x0 = x.domain(data.sort(sort).map(huishouden)).copy();
var transition = svg.transition();

// Hier worden de barren gesorteerd
svg.selectAll('.bar').sort(sortBar);

// Hier wordt een transitie toegevoegd, zodat de barren geleidelijk bewegen
transition.selectAll('.bar')
    .delay(delay)
    .attr('x', barX0);

transition.select('.axis--x')
    .call(d3.axisBottom(x))
    .selectAll('g')
    .delay(delay);

// Dit gedeelte calculeert hoe de barren gesorteerd moeten worden en hoe ze moeten bewegen
function sortBar(a, b) {
    return x0(huishouden(a)) - x0(huishouden(b));
}

function barX0(d) {
    return x0(huishouden(d));
}

function delay(d, i) {
    return i * 50;
    }
}
  
// Hier worden verschillende attributes aan de x-as gegeven   
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("text-anchor", "end")
    .attr("x", -10)
    .attr("y", 5)
    .attr("transform", "rotate(-45)");
  
// Hier worden verschillende attributes aan de x-as gegeven  
g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", -60)
      .attr("fill", "black")
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Besteedbaar inkomen in euro's x 1000");
  
// Hier worden alle barren geselecteerd en vervolgens attributen aan meegegeven
// Geraadpleegd van de slides les 3.    
g.selectAll(".bar")
    // Hier wordt de data geupdated van de dataset
    .data(data)
    // Hier worden nieuwe elementen gemaakt aan de hand van de data voor de barren
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.huishouden); })
    .attr("y", function(d) { return y(d.inkomen); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.inkomen); })
    .exit();
};

// Hier worden de inkomen geordend
function sortOnInkomen(a, b) {
    return inkomen(b) - inkomen(a);
}

// Hier worden de huishouden geordend
function sortOnHuishouden(a, b) {
    return d3.ascending(huishouden(a), huishouden(b));
}

// Hier wordt inkomen opgehaald
function inkomen(d) {
    return d.inkomen;
}

// Hier wordt huishouden opgehaald
function huishouden(d) {
    return d.huishouden;
}
