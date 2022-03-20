import { Audit, Version } from "auditphobia-gadget";
import NodeCache from "node-cache";

class Cache {
	public client: NodeCache;

	constructor() {
		this.client = new NodeCache();
	}

	private static getKeyName(packageName: string, version: Version): string {
		return `${packageName}_${version}`;
	}

	public get(packageName: string, version: Version): Audit[] | undefined {
		const key = Cache.getKeyName(packageName, version);

		const audits = this.client.get<string>(key);
		if (audits) {
			return JSON.parse(audits);
		}

		return undefined;
	}

	public set(packageName: string, version: Version, audits: Audit[]): boolean {
		const key = Cache.getKeyName(packageName, version);
		return this.client.set<string>(key, JSON.stringify(audits));
	}
}

export const cache = new Cache();
