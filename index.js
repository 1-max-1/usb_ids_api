import axios from "axios";
import { writeFileSync, mkdirSync } from "fs";

axios.get("http://www.linux-usb.org/usb.ids").then(res => parseData(res.data));

function parseData(data) {
	let obj = {"vendors": [], "version": "", "date": ""}
	let currentVendor = null;

	for (let line of data.split("\n")) {
		// Once we get this line we have passed all device ID's so we don't care anymore and we can exit
		if (line.startsWith("# List of known device classes, subclasses and protocols")) {
			obj.vendors.push(currentVendor);
			break;
		}

		// We only care about vendors and their devices
		let vendorMatch = line.match(/^([0-9a-f]{4})  (.+)$/);
		if (vendorMatch) {
			if (currentVendor)
				obj.vendors.push(currentVendor);
			currentVendor = makeVendor(vendorMatch[1], vendorMatch[2]);
			continue;
		}
		
		let deviceMatch = line.match(/^\t([0-9a-f]{4})  (.+)$/);
		if (deviceMatch)
			currentVendor.devices.push(makeDevice(deviceMatch[1], deviceMatch[2]));
		// These are at the top of the file, listed once
		else if (line.startsWith("# Version: "))
			obj.version = line.split(": ")[1]
		else if (line.startsWith("# Date: "))
			obj.date = line.split(":    ")[1]
	}

	mkdirSync("./api_build");
	writeFileSync("./api_build/devices.json", JSON.stringify(obj));
	writeFileSync("./api_build/devices_pretty.json", JSON.stringify(obj, null, 4));
}

function makeVendor(ID, name) {
	return {"id": ID, "name": name, "devices": []}
}

function makeDevice(ID, name) {
	return {"id": ID, "name": name}
}