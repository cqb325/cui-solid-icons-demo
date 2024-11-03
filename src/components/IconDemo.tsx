import * as BiIcons from "cui-solid-icons/bi";
import * as FeatherIcons from "cui-solid-icons/feather";
import * as F7Icons from "cui-solid-icons/f7";
import * as GeoIcons from "cui-solid-icons/geo";
import * as IoniconsIcons from "cui-solid-icons/ionicons";
import * as PhosphorIcons from "cui-solid-icons/phosphor";
import * as TablerIcons from "cui-solid-icons/tabler";
// import iconKeys from './data';
import { ColorPicker, Input, message, RadioGroup, Slider, Space, useCopy } from "cui-solid";
import { createComponent, createEffect, createSignal, For } from "solid-js";

export default function App () {
	const [family, setFamily] = createSignal("Feather");
	const [keyword, setKeyword] = createSignal("");
	const [size, setSize] = createSignal<number>(48);
	const [color, setColor] = createSignal("#000");
	const [iconsKeys, setIconsKeys] = createSignal<string[]>([]);
	const [currentIcon, setCurrentIcon] = createSignal({});
	const keys: any = {
		Bi: Object.keys(BiIcons),
		Feather: Object.keys(FeatherIcons),
		F7: Object.keys(F7Icons),
		Geo: Object.keys(GeoIcons),
		Ionicons: Object.keys(IoniconsIcons),
		Phosphor: Object.keys(PhosphorIcons),
		Tabler: Object.keys(TablerIcons)
	};
	const faIcons = {
		Bi: BiIcons,
		Feather: FeatherIcons,
		F7: F7Icons,
		Geo: GeoIcons,
		Ionicons: IoniconsIcons,
		Phosphor: PhosphorIcons,
		Tabler: TablerIcons
	};
	// const rets = keys.map(item => ({[`${item}`]: item}))
	// console.log(JSON.stringify(rets, null, 4));
	// const keywordMap: any = {};
	// iconKeys.map(item => {
	//     const k = Object.keys(item)[0];
	//     keywordMap[k] = item[k];
	// })
    
	createEffect(() => {
		const fa = family();
		console.log(fa);
        
		const kw = keyword();
		const icons = keys[fa].filter((icon: string) => {
			return icon.startsWith(fa) && icon.toLowerCase().includes(kw.toLowerCase());
		});
		setCurrentIcon((faIcons[fa] as any));
		setIconsKeys(icons);
	});

	const copyIcon = (icon: string) => {
		useCopy(`<${icon} />`);
		message.success({
			content: `复制成功: <${icon} />`,
			background: true
		});
	};
	return <div>
		<Space dir='v' size={24}>
			<Space dir='v' size={16} class='icon-search-wrap'>
				<Input type="search" size="large" placeholder="搜索" value={[keyword, setKeyword]} trigger="input"/>
				<Space size={50}>
					<RadioGroup stick value={[family, setFamily]} data={[
						{label: "Feather", value: "Feather"},
						{label: "Ionicons", value: "Ionicons"},
						{label: "Bootstrap", value: "Bi"},
						{label: "Geo", value: "Geo"},
						{label: "Phosphor", value: "Phosphor"},
						{label: "Tabler", value: "Tabler"},
						{label: "F7", value: "F7"}]} />
					<Slider min={16} max={128} step={8} value={[size, setSize]} style={{width: "200px"}}/>
					<ColorPicker value={[color, setColor]}/>
				</Space>
			</Space>
			<div class='icon-list'>
				<For each={iconsKeys()}>
					{(icon: string) => {
						return <div class='icon-item' onClick={() => copyIcon(icon)}>
							{createComponent((currentIcon())[icon], { size: size(), color: color() })}
							<div class='icon-name'>{currentIcon()[icon].displayName}</div>
						</div>;
					}
					}
				</For>
			</div>
		</Space>
	</div>;
}