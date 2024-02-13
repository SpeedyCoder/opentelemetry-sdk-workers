import { ExportResult, ExportResultCode, baggageUtils } from "@opentelemetry/core";
import { LogRecord } from "../types";

export class OTLPConsoleLogExporter {
	export(
		logRecords: LogRecord[],
		resultCallback: (result: ExportResult) => void
	): void {
		logRecords.forEach((record) => {
			let method: "debug" | "info" | "warn" | "error" | "log" = "log";
			switch (record.severityNumber) {
				case 5:
					method = "debug";
					break;
				case 9:
					method ="info";
					break;
				case 13:
					method = "warn"
					break;
				case 17:
				case 21:
					method = "error";
					break;
			}
			const {body, attributes} = record
			console[method](body, JSON.stringify(attributes))
		})
		resultCallback({code: ExportResultCode.SUCCESS})
	}

	/** Stops the exporter. Throws in Cloudflare, added for future compat */
	shutdown(): Promise<void> {
		throw new Error("Shutdown is not supported by this exporter.");
	}
}
