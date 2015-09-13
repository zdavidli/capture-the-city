# hophacks-f2015

Created for HopHacks Fall 2015 at the Johns Hopkins University.
This web app allows two users to play a variant of the game [Go](https://en.wikipedia.org/wiki/Go_%28game%29).
The goal of the game is to capture as much territory as possible - you do this by selecting an intersection from
the possibilities, and the cell around it represents the amount of area you gain. The cell isn't completely arbitrary --
it's a Voronoi diagram, a visualization that partitions a plane into regions closer to a specific point than any other.

Since the points we picked for this app are street intersections, we're playing Go on the city streets! 
As of the demonstration, we've uploaded four maps on which to play -- one in Baltimore centered at JHU, one in New York, one in Hong Kong, and one in Rome.

We used d3.js in order to generate the Voronoi diagrams and used a read-only API for OpenStreetMap called [Overpass](http://wiki.openstreetmap.org/wiki/Overpass_API) in order to find the intersections of streets. 
Once we found the coordinate of intersections, we plotted them onto Google Maps using the Maps JavaScript API.

You may see the game in action [here.](https://www.youtube.com/watch?v=HpT5ScNET_A)
