## CSV Report Generator

My implementation of the CSV Report Generator shall meet the following requirements:

* [ ] Use express to serve static files and to route the POST endpoint
* [ ] Client app to submit JSON data to the server, first from a text field
* [ ] Uses an HTML form and action to send the POST request
* [ ] Only uses jQuery for DOM manipulation
* [ ] Follows the conversion specification:
  * [ ] Flatten the JSON hierarchy
  * [ ] Object keys are not the CSV columns
  * [ ] Handle the fact that sibling/adjacent data has the same shape
  * [ ] Child data are in a children property, data shape can differ from parent
* [ ] Client sends JSON data, receives XML data response, first in a different page, later in a SPA
* [ ] Add link to the most recent report

