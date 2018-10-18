## CSV Report Generator

My implementation of the CSV Report Generator shall meet the following requirements:

* [X] Use express to serve static files and to route the POST endpoint
* [X] Client app to submit JSON data to the server, first from a text field
* [X] Follows the conversion specification:
  * [X] Flatten the JSON hierarchy
  * [X] Object keys become the CSV columns for rows that share the same shape
  * [X] Handle the fact that sibling/adjacent data can have same shape
  * [X] Child data are in a children property, data shape can differ from parent
* [X] Client sends JSON data, receives XML data response, first in a different page, later in a SPA
* [X] Add link to the most recent report

