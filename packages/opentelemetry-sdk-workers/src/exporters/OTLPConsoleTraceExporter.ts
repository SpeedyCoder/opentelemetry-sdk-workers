import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";

export class OTLPConsoleTraceExporter {
	export(
		spans: ReadableSpan[],
		resultCallback: (result: ExportResult) => void
	): void {
		spans.forEach((span) => {
			const {name, attributes} = span
			console.log("SPAN", name,  JSON.stringify(attributes))
		})
		resultCallback({code: ExportResultCode.SUCCESS})
	}
	shutdown(): Promise<void> {
		throw new Error("Shutdown is not supported by this exporter.");
	}
}
