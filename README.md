# USB ID's API
[http://www.linux-usb.org/usb.ids](http://www.linux-usb.org/usb.ids) provides a list of USB device and vendor ID's. However, it is in a format which takes a little work to parse.
This project includes a simple nodejs script to convert the data into JSON format, which is then exposed through github pages.

`index.js` contains the code for parsing the USB ID's. Results are placed into files in an `api_build` directory. `api_build/devices.json` contains the minified JSON data, `api_build/devices_pretty.json` is a human readable version of the data. A github action runs this script periodically, 1 p.m. every Sunday and Wednesday. The results are published to this repository's github pages site.

- [https://1-max-1.github.io/usb_ids_api/devices.json](https://1-max-1.github.io/usb_ids_api/devices.json) contains the raw JSON.
- [https://1-max-1.github.io/usb_ids_api/devices_pretty.json](https://1-max-1.github.io/usb_ids_api/devices_pretty.json) contains the human readable version.