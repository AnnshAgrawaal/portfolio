export type ClassValue = string | number | null | undefined | false | ClassValue[] | { [k: string]: boolean };

export function cn(...inputs: ClassValue[]): string {
	const classes: string[] = [];
	for (const input of inputs) {
		if (!input) continue;
		if (typeof input === 'string' || typeof input === 'number') {
			classes.push(String(input));
			continue;
		}
		if (Array.isArray(input)) {
			classes.push(cn(...input));
			continue;
		}
		if (typeof input === 'object') {
			for (const key of Object.keys(input)) {
				if ((input as any)[key]) classes.push(key);
			}
		}
	}
	return classes.join(' ');
}
