# Intro to Oboe.js
## or: Lying to your users in the Best Possible Way(tm)

### Setup
After cloning the repository, run `npm install` and `bower install`. `gulp serve` starts a development server on port 9000.

### Motivation
- User interface design is at the intersection of computing and psychology
- Hypothesis: making users wait a long time produces a negative user experience.
- Example: downloading an entire video file before watching it vs. streaming it from YouTube.

### Enter Oboe
- What's in a name? Oboe is a play on the word SAX (Simple API for XML) which is a method for parsing XML documents. SAX was developed as a "streaming" alternative to the DOM (Document Object Model). Where the DOM must be parsed in its entirety before it can be operated on (document.getElementById(), for example), SAX allows us to process nodes as they become available (sequentially).
- Allows us to use standard XHR (XMLHttpRequest) techniques to stream data over HTTP


> Under asynchronous I/O the programmer’s callback traditionally receives the whole resource and then, inside the callback, locates the sub-parts that are required for a particular task. Inverting this process, the locating logic currently found inside the callback can be extracted, expressed as a selector language, and used to declare the cases in which the callback should be notified. The callback will receive complete fragments from the response once they have been selected according to this declaration.


### Experiment
- Using D3, put two charts side by side and load 5000 data points into each, one renders only after all points have been received, the other loads the points as they are being transmitted
- We don't know which points are going to come in first, but it doesn't matter because they don't need to appear in any order to be meaningful
- If we do a request on this endpoint using `curl`, you can see that it shows the data points as they are coming in
- Problem: at any point in time before the entire document is loaded, this is not valid JSON! Don't we need to have the whole object before we can operate on it, like the DOM? (Answer: Nope!) Instead, we parse the document fragments into a node buffer. Works like a tree: we can append nodes to other nodes as they come in, and we end up with a parse tree of the document in the end.

### References
- [Why waiting is torture](http://www.nytimes.com/2012/08/19/opinion/sunday/why-waiting-in-line-is-torture.html?_r=0)
- [Making slow things seem faster](http://blog.placeit.net/ux-tactics-make-slow-things-seem-faster/)
- [The 3 white lies behing Instagram's lightning speed](http://www.fastcodesign.com/1669788/the-3-white-lies-behind-instagrams-lightning-speed)
- [Non-blocking UI's with interface previews](http://www.callumhart.com/blog/non-blocking-uis-with-interface-previews)
- [Oboe.js documentation](http://www.oboejs.com/examples)
