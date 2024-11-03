// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

export default function App() {
	return <Router
		root={(props) => (
			<MetaProvider>
				<Title>CUI-Solid-Icons Docs</Title>
				<ErrorBoundary fallback={<div>404</div>}>
					<Suspense>{props.children}</Suspense>
				</ErrorBoundary>
			</MetaProvider>
		)}
	>
		<FileRoutes />
	</Router>;
}
