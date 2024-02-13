import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";

export class OTLPConsoleTraceExporter {
	export(
		spans: ReadableSpan[],
		resultCallback: (result: ExportResult) => void
	): void {
		spans.forEach((span) => {
			const {name, ...meta} = span
			console.log(name, meta)
		})
		resultCallback({code: ExportResultCode.SUCCESS})
	}
	shutdown(): Promise<void> {
		throw new Error("Shutdown is not supported by this exporter.");
	}
}
