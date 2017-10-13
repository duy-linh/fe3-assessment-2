# Assessment 2!

## Achtergrond

Dit was een assessment voor Front-End 3 waarbij we een interactieve visualisatie hebben moeten maken, daarbij hebben we ook data moet cleanen. Aan de hand van de voorgaande oefeningen en de voorbeelden heb ik de assessment kunnen maken.

## Proces

Aan de hand van de voorgaande oefeningen, heb ik gekozen voor basic chart van `Mike Bostock's Bar Chart August 20, 2017 https://bl.ocks.org/mbostock/3885304`, deze heb ik ook in mijn assessment 1 gebruikt. Na het kiezen van een nieuwe dataset op CBS, ben ik de data gaan cleanen. Dit heb ik met de hulp gedaan van de slides van les 3. Daarnaast had ik in de `Slack groep` gezien dat meerdere mensen moeite hadden met het cleanen van hun data. Ik heb een aantal oplossingen gebruikt van de Slack groep die ik zelf heb kunnen toepassen. Voor het sorteren van de data heb ik de code van 'sort' gebruikt die in de examples staan van `@wooorm`. 


## Aanpassingen

### index.html
* Javascript en CSS gelinked

### index.js
* Mike Bostock's Bar Chart August 20, 2017 (https://bl.ocks.org/mbostock/3885304)
* Ik heb de footer verwijderd van mij dataset, met behulp van #frontend-3 channel van @deshlieee
``` javascript
var footer = data.indexOf('� Statistics Netherlands, Den Haag/Heerlen 12-10-2017');
var remove = data.splice(footer);
```
* Aan de Y-as heb ik wat tekst toegevoegd
``` javascript
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
```
* Kleine aanpassingen gedaan aan de 'sort' code van `@wooorm`, met voornamelijk het doel om het werkend te maken

### index.css
* Kleur toegepast, ook bij een :hover
* Transitie in :hover
* Lettertype aangepast aan de titel

## Data

De dataset die ik heb gebruikt is: (http://statline.cbs.nl/StatWeb/publication/?VW=T&DM=SLNL&PA=83739NED&LA=NL). Op de linker bar staat een download knop.

Er worden twee data types gebruikt:

* `Inkomen` - weergeeft het aantal besteedbaar inkomen, op de y-as.
* `Huishouden` - weergeeft de huishouden, op de x-as.


## Licentie

GPL-3.0 © Duy-Linh Pham