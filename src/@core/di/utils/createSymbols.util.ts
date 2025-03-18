export const createSymbol = <T>(name: string): symbol & { __type: T } =>
	Symbol.for(name) as symbol & { __type: T };
