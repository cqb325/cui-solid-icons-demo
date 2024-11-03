import { clientOnly } from "@solidjs/start";
const IconDemo = clientOnly(() => import("./IconDemo"));

export default function Demo() {
	return <IconDemo />;
}